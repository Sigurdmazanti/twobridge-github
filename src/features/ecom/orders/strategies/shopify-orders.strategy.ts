import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
	handleError,
	handleResponse,
	handleShopifyError,
} from 'src/common/helpers/utils/return-utils';
import { splitBearerToken } from 'src/common/helpers/utils/headers-utils';
import { OrdersStrategy } from '../interfaces/orders-strategy.interface';
import {
	GetUserOrdersQueryParamsDto,
	GetUserOrdersResponseDto,
} from '../dto/get-user-orders.dto';
import {
	mapShopifyGetUserOrdersQueryParams,
	mapShopifyGetUserOrdersResponse,
} from '../mapping/get-user-orders.mapper';
import { detectShopifyErrors } from 'src/common/helpers/shopify/utils/get-error-code-util';
import {
    addressFragment,
    priceFragment,
    variantFragment,
    lineItemFragment,
    orderFragment,
} from '../fragments/shopify/get-user-orders.fragments'

export class ShopifyOrdersStrategy implements OrdersStrategy {
	constructor(private readonly httpService: HttpService) {}

	async getUserOrders(
		authHeader: string,
		queryParams: GetUserOrdersQueryParamsDto = {},
	): Promise<GetUserOrdersResponseDto> {
		try {
			const token = splitBearerToken(authHeader);

			const mappedQueryParams =
				mapShopifyGetUserOrdersQueryParams(queryParams);

			const variables: any = {
				customerAccessToken: token,
				pageSize: mappedQueryParams.pageSize ?? 5,
			};

			if (mappedQueryParams.afterCursor)
				variables.afterCursor = mappedQueryParams.afterCursor;

			if (mappedQueryParams.sortBy)
				variables.sortKey = mappedQueryParams.sortBy;

			const query = `
            ${addressFragment}
            ${priceFragment}
            ${variantFragment}
            ${lineItemFragment}
            ${orderFragment}
            
            query customerOrders(
                $customerAccessToken: String!,
                $pageSize: Int,
                $afterCursor: String,
                $sortKey: OrderSortKeys
            ) {
                customer(customerAccessToken: $customerAccessToken) {
                    id
                    displayName
                    firstName
                    lastName
                    phone
                    email
            
                    defaultAddress {
                        ...AddressFields
                    }
            
                    orders(
                        first: $pageSize,
                        after: $afterCursor,
                        sortKey: $sortKey
                    ) {
                        pageInfo {
                            hasNextPage
                            endCursor
                        }
            
                        totalCount
            
                        edges {
                            node {
                                ...OrderFields
                            }
                        }
                    }
                }
            }`;            

			const response = await firstValueFrom(
				this.httpService.post(
					process.env.SHOPIFY_STOREFRONT_API_URL,
					{
						query: query,
						variables,
					},
					{
						headers: {
							'X-Shopify-Storefront-Access-Token':
								process.env.SHOPIFY_PUBLIC_KEY,
						},
					},
				),
			);

			const shopifyErrors = detectShopifyErrors(response.data);

			if (shopifyErrors) {
				response.data = handleShopifyError(shopifyErrors);
			} else {
				response.data = mapShopifyGetUserOrdersResponse(response.data);
			}

			return handleResponse(response);
		} catch (error) {
			return handleError(error);
		}
	}
}
