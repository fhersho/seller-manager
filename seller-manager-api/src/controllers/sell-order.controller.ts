import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MelonnService } from "../services/melonn.service";
import { SellOrderDto } from "../dtos/sell-order.dto";
import { SellOrderService } from "../services/sell-order.service";
import { SellOrderSaveDto } from "../dtos/sell-order-save.dto";
import { SellOrderListDto } from "../dtos/sell-order-list.dto";

@ApiTags("sell-orders")
@Controller("sell-orders")
export class SellOrderController {
  constructor(private sellOrderService: SellOrderService){}

  @Post()
  @ApiResponse({status: 201, type:SellOrderDto, isArray:false})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 404, description: 'Not Found'})
  getShippingMethod(@Body() sellOrder: SellOrderSaveDto): Promise<SellOrderDto> {
    return this.sellOrderService.save(sellOrder);
  }

  @Get()
  @ApiResponse({status: 200, isArray:true})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 404, description: 'Not Found'})
  getAll(): Promise<SellOrderListDto[]> {
    return this.sellOrderService.getAll();
  }

  @Get(":externalOrderNumber")
  @ApiResponse({status: 200, isArray:false})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 404, description: 'Not Found'})
  getByExternalOrderNumber(@Param("externalOrderNumber") externalOrderNumber: string): Promise<SellOrderDto> {
    return this.sellOrderService.getByExternalOrderNumber(externalOrderNumber);
  }
}
