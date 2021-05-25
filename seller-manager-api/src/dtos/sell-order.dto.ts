import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductDto } from "./product.dto";

export class SellOrderDto {
  internalOrderNumber: string;
  sellerStore: string;
  shippingMethod: number;
  externalOrderNumber: string;
  buyerFullName: string;
  buyerPhoneNumber: number;
  buyerEmail: string;
  shippingAddress: string;
  shippingCity: string;
  shippingRegion: string;
  shippingCountry: string;
  items: ProductDto[];
  creationDate: string = null;
  packPromiseMin: number;
  packPromiseMax: number;
  shipPromiseMin: number;
  shipPromiseMax: number;
  deliveryPromiseMin: number;
  deliveryPromiseMax: number;
  readyPickupPromiseMin: number;
  readyPickupPromiseMax: number;
}
