import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MelonnService } from "../services/melonn.service";
import { ShippingMethodDto } from "../dtos/shipping-method.dto";

@ApiTags("shipping-methods")
@Controller("shipping-methods")
export class ShippingMethodController {
  constructor(private melonnService: MelonnService){}

  @Get()
  @ApiResponse({status: 200, type:ShippingMethodDto, isArray:true})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 404, description: 'Not Found'})
  getShippingMethod(): Promise<ShippingMethodDto[]> {
    return this.melonnService.getShippingMethod();
  }

  @Get(":id")
  @ApiResponse({status: 200, type: ShippingMethodDto, isArray:false})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 404, description: 'Not Found'})
  getById(@Param("id") id: number): Promise<ShippingMethodDto> {
    return this.melonnService.getShippingMethodDetail(id);
  }
}
