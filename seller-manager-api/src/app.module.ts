import { HttpModule, Module } from "@nestjs/common";
import { MelonnService } from "./services/melonn.service";
import { SellOrderController } from "./controllers/sell-order.controller";
import { SellOrderService } from "./services/sell-order.service";
import { StorageService } from "./services/storage.service";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { NotFoundInterceptor } from "./interceptors/not-found-interceptor";
import { ShippingMethodController } from "./controllers/shipping-method.controller";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5
    })
  ],
  controllers: [
    SellOrderController,
    ShippingMethodController
  ],
  providers: [
    MelonnService,
    SellOrderService,
    StorageService,
    {
      provide: APP_INTERCEPTOR,
      useClass: NotFoundInterceptor
    }
  ]
})
export class AppModule {
}
