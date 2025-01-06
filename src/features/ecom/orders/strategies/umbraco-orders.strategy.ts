import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
	handleError,
	handleResponse,
} from 'src/common/helpers/utils/return-utils';
import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import { createAuthHeaders, splitBearerToken } from 'src/common/helpers/utils/headers-utils';
import { OrdersStrategy } from '../interfaces/orders-strategy.interface';
import {
	GetUserOrdersQueryParamsDto,
	GetUserOrdersResponseDto,
} from '../dto/get-user-orders.dto';
import { mapDynamicwebGetUserOrdersQueryParams, mapDynamicwebGetUserOrdersResponse, mapUmbracoGetUserOrdersResponse } from '../mapping/get-user-orders.mapper';

export class UmbracoOrdersStrategy implements OrdersStrategy {
	constructor(private readonly httpService: HttpService) {}

	async getUserOrders(
		authHeader: AuthHeadersDto,
		queryParams: GetUserOrdersQueryParamsDto = {},
	): Promise<GetUserOrdersResponseDto> {
		try {
			const customerReference = splitBearerToken(authHeader as any);

			const response = await firstValueFrom(
				this.httpService.get(
					`${process.env.UMBRACO_API_URL}/umbraco/commerce/storefront/api/v1/customer/${customerReference}/orders`,
					{ 
                        headers: {
                            'Api-Key': process.env.UMBRACO_API_KEY,
                            'Store': process.env.UMBRACO_STORE 
                        } 
                    },
				),
			);

			response.data = mapUmbracoGetUserOrdersResponse(response.data, queryParams);
			return handleResponse(response);

		} catch (error) {
			return handleError(error);
		}
	}
}

//TODO: RUN TESTS
//TODO: CREATE API DOCUMENTATION ON SWAGGER
//TODO: IF EXTRA TIME, CREATE MORE TESTS FOR MAPPERS