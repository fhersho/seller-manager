import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  productQty: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  productWeight: number;
}