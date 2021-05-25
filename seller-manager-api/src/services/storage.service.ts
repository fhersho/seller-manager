import { Injectable } from "@nestjs/common";
import { SellOrderDto } from "../dtos/sell-order.dto";
import { SellOrderListDto } from "../dtos/sell-order-list.dto";
import { MelonnService } from "./melonn.service";

const NodeCache = require("node-cache");
const cache = new NodeCache();
const ORDERS = "orders";

@Injectable()
export class StorageService {

  constructor(private melonnService: MelonnService) {
  }
  save(sellOrder: SellOrderDto) {
    let orders = cache.get(ORDERS) ? cache.get(ORDERS) : [];
    orders = [...orders, sellOrder];
    cache.set(ORDERS, orders);
  }

  async getOrders(): Promise<SellOrderListDto[]> {
    let ordersList: SellOrderListDto[] = [];
    const orders: SellOrderDto[] = cache.get(ORDERS) ? cache.get(ORDERS) : [];
    for (const order of orders){
      ordersList = [...ordersList, {
          externalOrderNumber: order.externalOrderNumber,
          sellerStore: order.sellerStore,
          creationDate: order.creationDate,
          shippingMethod: (await this.melonnService.getShippingMethodDetail(order.shippingMethod)).name
        }
      ];
    }
    return ordersList;
  }

  getByExternalOrderNumber(externalOrderNumber: string): SellOrderDto {
    let orders = cache.get(ORDERS) ? cache.get(ORDERS) : [];
    const order = orders.filter(o => o.externalOrderNumber === externalOrderNumber);
    return order[0];
  }
}
