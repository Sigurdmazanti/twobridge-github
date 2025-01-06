import { Module } from '@nestjs/common';
import { EcomService } from './ecom.service';
import { EcomController } from './ecom.controller';
import { OrdersModule } from './orders/orders.module';
import { CheckoutModule } from './checkout/checkout.module';

@Module({
	providers: [EcomService],
	controllers: [EcomController],
	imports: [OrdersModule, CheckoutModule],
})
export class EcomModule {}
