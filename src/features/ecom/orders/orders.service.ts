import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { getStrategyBasedOnConfig } from 'src/common/helpers/strategy-helper';
import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import { OrdersStrategy } from './interfaces/orders-strategy.interface';
import { DynamicwebOrdersStrategy } from './strategies/dynamicweb-orders.strategy';
import { GetUserOrdersQueryParamsDto } from './dto/get-user-orders.dto';
import { ShopifyOrdersStrategy } from './strategies/shopify-orders.strategy';
import { UmbracoOrdersStrategy } from './strategies/umbraco-orders.strategy';

@Injectable()
export class OrdersService {
	private strategy: OrdersStrategy;

	constructor(private readonly httpService: HttpService) {
		this.strategy = this.getStrategy(this.httpService);
	}

	private getStrategy(httpService: HttpService): OrdersStrategy {
		return getStrategyBasedOnConfig<OrdersStrategy>(
			{
				dynamicweb: (httpService) =>
					new DynamicwebOrdersStrategy(httpService),
				umbraco: (httpService) => 
					new UmbracoOrdersStrategy(httpService),
				shopify: (httpService) => 
					new ShopifyOrdersStrategy(httpService),
			},
			httpService,
		);
	}
	
	getUserOrders(
		authHeader: AuthHeadersDto,
		queryParams: GetUserOrdersQueryParamsDto,
	) {
		return this.strategy.getUserOrders(authHeader, queryParams);
	}
}
