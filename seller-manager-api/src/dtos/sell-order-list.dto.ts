import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductDto } from "./product.dto";

export class SellOrderListDto {
  externalOrderNumber: string;
  sellerStore: string;
  creationDate: string;
  shippingMethod: string;
}
