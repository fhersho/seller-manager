import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductDto } from "./product.dto";

export class SellOrderSaveDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sellerStore: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  shippingMethod: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  externalOrderNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  buyerFullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  buyerPhoneNumber: number;

  @ApiProperty({default: "buyerEmail@email.com"})
  @IsNotEmpty()
  @IsEmail()
  buyerEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  shippingAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  shippingCity: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  shippingRegion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  shippingCountry: string;

  @ApiProperty({type: ProductDto, isArray: true})
  @IsNotEmpty()
  @IsArray()
  items: ProductDto[];
}
