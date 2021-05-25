import { Injectable, NotFoundException } from "@nestjs/common";
import config from "../shared/config";
import { StorageService } from "./storage.service";
import { SellOrderDto } from "../dtos/sell-order.dto";
import { SellOrderSaveDto } from "../dtos/sell-order-save.dto";
import {
  addHour,
  getBusinessOrderNumber,
  getCreationDate,
  getFormat,
  getFormatPromiseFormat,
  getHour
} from "../shared/utils";
import { MelonnService } from "./melonn.service";
import { ShippingMethodDto } from "../dtos/shipping-method.dto";
import { PromiseParameterCasesDto } from "../dtos/promise-parameter-cases.dto";
import { SellOrderListDto } from "../dtos/sell-order-list.dto";


const optionsGet = {
  method: "GET",
  headers: {
    "x-api-key": config.API_KEY
  }
};

@Injectable()
export class SellOrderService {

  constructor(private storage: StorageService, private melonnService: MelonnService) {
  }

  async save(sellOrderSaveDto: SellOrderSaveDto): Promise<SellOrderDto> {
    // get datetime
    const nowDateTime = new Date();

    const orders = await this.storage.getOrders();
    const order = orders.filter(order => order.externalOrderNumber === sellOrderSaveDto.externalOrderNumber);

    if (order.length > 0) {
      throw new NotFoundException("the external order number already exists");
    }
    let sellOrderDto: SellOrderDto = {
      ...sellOrderSaveDto,
      creationDate: getCreationDate(),
      internalOrderNumber: getBusinessOrderNumber(),
      packPromiseMin: null,
      packPromiseMax: null,
      shipPromiseMin: null,
      shipPromiseMax: null,
      deliveryPromiseMin: null,
      deliveryPromiseMax: null,
      readyPickupPromiseMin: null,
      readyPickupPromiseMax: null
    };

    // get shipping method
    const shippingMethod = await this.melonnService.getShippingMethodDetail(sellOrderDto.shippingMethod);

    //get next business days
    const nextBusinessDays = await this.getNextBusinessDays(nowDateTime);

    if (await this.canCalculatePromises(sellOrderDto, shippingMethod, nextBusinessDays, nowDateTime)) {
      sellOrderDto = await this.calculatePromises(sellOrderDto, shippingMethod, 1, nextBusinessDays, nowDateTime);
    }

    await this.storage.save(sellOrderDto);

    return sellOrderDto;
  }

  async calculatePromises(sellOrderDto: SellOrderDto, shippingMethod: ShippingMethodDto, priority: number,
                          nextBusinessDays: string[], nowDateTime: Date): Promise<SellOrderDto> {

    const cs = await shippingMethod.rules.promisesParameters.cases.find(c => c.priority === priority);
    if (!cs) {
      return sellOrderDto;
    }

    if (cs.condition.byRequestTime.dayType === "BUSINESS" &&
      !this.isBusinessDay(nextBusinessDays, nowDateTime)) {
      return await this.calculatePromises(sellOrderDto, shippingMethod, priority++, nextBusinessDays, nowDateTime);
    }

    if (!this.isTimeOfDay(cs.condition.byRequestTime.fromTimeOfDay, cs.condition.byRequestTime.toTimeOfDay, nowDateTime)) {
      return await this.calculatePromises(sellOrderDto, shippingMethod, priority++, nextBusinessDays, nowDateTime);
    }

    sellOrderDto.packPromiseMin = this.getPromise(cs.packPromise.min, nextBusinessDays, nowDateTime);
    sellOrderDto.packPromiseMax = this.getPromise(cs.packPromise.max, nextBusinessDays, nowDateTime);

    sellOrderDto.shipPromiseMin = this.getPromise(cs.shipPromise.min, nextBusinessDays, nowDateTime);
    sellOrderDto.shipPromiseMax = this.getPromise(cs.shipPromise.max, nextBusinessDays, nowDateTime);

    sellOrderDto.deliveryPromiseMin = this.getPromise(cs.deliveryPromise.min, nextBusinessDays, nowDateTime);
    sellOrderDto.deliveryPromiseMax = this.getPromise(cs.deliveryPromise.max, nextBusinessDays, nowDateTime);

    sellOrderDto.readyPickupPromiseMin = this.getPromise(cs.readyPickUpPromise.min, nextBusinessDays, nowDateTime);
    sellOrderDto.readyPickupPromiseMax = this.getPromise(cs.readyPickUpPromise.max, nextBusinessDays, nowDateTime);


    return sellOrderDto;

  }

  getPromise({ type, deltaHours, deltaBusinessDays, timeOfDay }, nextBusinessDays: string[], nowDateTime: Date) {
    let promise = null;

    switch (type) {
      case "NULL":
        promise = null;
        break;

      case "DELTA-HOURS":
        promise = addHour(nowDateTime, deltaHours);
        break;

      case "DELTA-BUSINESSDAYS":
        let date = nextBusinessDays[deltaBusinessDays - 1];
        const datePromise = new Date(date);
        datePromise.setHours(timeOfDay);
        promise = getFormatPromiseFormat(datePromise);
        break;

      default:
        break;
    }
    return promise;
  }

  async canCalculatePromises(sellOrderDto: SellOrderDto, shippingMethod: ShippingMethodDto,
                             nextBusinessDays: string[], nowDateTime: Date): Promise<boolean> {


    if (!(await this.validateWeight(shippingMethod, sellOrderDto))) {
      // if no is valid weight
      return false;
    }

    if (shippingMethod.rules.availability.byRequestTime.dayTime === "BUSINESS" &&
      !this.isBusinessDay(nextBusinessDays, nowDateTime)) {
      // if dayTime is BUSINESS and not is business day.
      return false;
    }

    if (!this.isTimeOfDay(shippingMethod.rules.availability.byRequestTime.fromTimeOfDay,
      shippingMethod.rules.availability.byRequestTime.toTimeOfDay, nowDateTime)) {
      // if dayTime is BUSINESS and not is business day.
      return false;
    }

    return true;
  }

  isBusinessDay(businessDays: string[], nowDatetime: Date): boolean {
    const date = getFormat(nowDatetime);
    return businessDays.filter(day => day === date).length > 0;
  }

  isTimeOfDay(fromTimeOfDay: number, toTimeOfDay: number, nowDatetime: Date): boolean {
    const hour = Number(getHour(nowDatetime));
    return (hour >= fromTimeOfDay && hour <= toTimeOfDay);
  }

  async validateWeight(shippingMethod: ShippingMethodDto, sellOrderDto: SellOrderDto): Promise<boolean> {
    const orderWeight = await this.getOrderWeight(sellOrderDto);
    return (orderWeight >= shippingMethod.rules.availability.byWeight.min &&
      orderWeight <= shippingMethod.rules.availability.byWeight.max);
  }

  async getOrderWeight(sellOrderDto: SellOrderDto): Promise<number> {
    let orderWeight = 0;
    await sellOrderDto.items.forEach(product => orderWeight += (product.productWeight * product.productQty));
    return orderWeight;
  }

  async getNextBusinessDays(date: Date): Promise<string[]> {
    const offDays = await this.melonnService.getOffDays();

    if (offDays) {
      const nextDays: string[] = [];

      while (true) {
        date.setDate(date.getDate() + 1);
        const dateString = getFormat(date);
        if (offDays.indexOf(dateString) === -1) {
          nextDays.push(dateString);
        }
        if (nextDays.length === 10) {
          return nextDays;
        }
      }
    }
    return [];
  }

  async getAll(): Promise<SellOrderListDto[]> {
    return this.storage.getOrders();
  }

  async getByExternalOrderNumber(externalOrderNumber: string): Promise<SellOrderDto> {
    return this.storage.getByExternalOrderNumber(externalOrderNumber);
  }
}
