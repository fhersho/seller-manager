import { Injectable } from "@nestjs/common";
import { SellOrderDto } from "../dtos/sell-order.dto";

const NodeCache = require("node-cache");
const cache = new NodeCache();
const ORDERS = "orders";

@Injectable()
export class StorageService {

  save(sellOrder: SellOrderDto) {
    let orders = cache.get(ORDERS) ? cache.get(ORDERS) : [];
    orders = [...orders, sellOrder];
    cache.set(ORDERS, orders);
  }

  getOrders (): SellOrderDto[]{
    return cache.get(ORDERS)?cache.get(ORDERS):[];
  }

  getByExternalOrderNumber (externalOrderNumber: number): SellOrderDto {
    let orders = cache.get(ORDERS) ? cache.get(ORDERS) : [];
    const order = orders.filter (o => o.externalOrderNumber == externalOrderNumber);
    return order[0];
  }
}
