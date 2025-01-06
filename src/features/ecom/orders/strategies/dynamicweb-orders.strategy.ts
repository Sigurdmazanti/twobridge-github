import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { plainToClass } from 'class-transformer';
import {
	handleError,
	handleResponse,
} from 'src/common/helpers/utils/return-utils';
import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import { createAuthHeaders } from 'src/common/helpers/utils/headers-utils';
import { OrdersStrategy } from '../interfaces/orders-strategy.interface';
import {
	GetUserOrdersQueryParamsDto,
	GetUserOrdersResponseDto,
} from '../dto/get-user-orders.dto';
import {
	mapDynamicwebGetUserOrdersQueryParams,
	mapDynamicwebGetUserOrdersResponse,
} from '../mapping/get-user-orders.mapper';

export class DynamicwebOrdersStrategy implements OrdersStrategy {
	constructor(private readonly httpService: HttpService) {}

	async getUserOrders(
		authHeader: AuthHeadersDto,
		queryParams: GetUserOrdersQueryParamsDto = {},
	): Promise<GetUserOrdersResponseDto> {
		try {
			const refreshHeaders = createAuthHeaders(authHeader.authorization);
			const mappedQueryParams =
				mapDynamicwebGetUserOrdersQueryParams(queryParams);
			const queryString = new URLSearchParams(
				mappedQueryParams as any,
			).toString();

			console.log(refreshHeaders);

			const response = await firstValueFrom(
				this.httpService.get(
					`${process.env.DYNAMICWEB_API_URL}/dwapi/ecommerce/orders?${queryString}`,
					{ headers: refreshHeaders },
				),
			);

			response.data = mapDynamicwebGetUserOrdersResponse(response.data);
			return handleResponse(response);
		} catch (error) {
			return handleError(error);
		}
	}
}
