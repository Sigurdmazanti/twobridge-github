import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
	handleError,
	handleResponse,
	handleShopifyError,
} from 'src/common/helpers/utils/return-utils';
import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import {
	splitBearerToken,
} from 'src/common/helpers/utils/headers-utils';
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

export class ShopifyOrdersStrategy implements OrdersStrategy {
	constructor(private readonly httpService: HttpService) {}

	async getUserOrders(
		authHeader: AuthHeadersDto,
		queryParams: GetUserOrdersQueryParamsDto = {},
	): Promise<GetUserOrdersResponseDto> {
		try {
			const token = splitBearerToken(authHeader.authorization);
            console.log(authHeader.authorization);
            
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

			const query = `query customerOrders(
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
                        address1
                        address2
                        zip
                        city
                        country
                        countryCodeV2
                        company
                        province
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
                                id
                                name
                                orderNumber
                                processedAt
                                fulfillmentStatus

                                totalPrice {
                                    amount
                                    currencyCode
                                }

                                subtotalPrice {
                                    amount
                                    currencyCode
                                }

                                currentTotalTax {
                                    amount
                                    currencyCode
                                }

                                currentTotalPrice {
                                    amount
                                    currencyCode
                                }

                                originalTotalPrice {
                                    amount
                                    currencyCode
                                }

                                currentSubtotalPrice {
                                    amount
                                    currencyCode
                                }

                                totalTax {
                                    amount
                                    currencyCode
                                }

                                totalShippingPrice {
                                    amount
                                    currencyCode
                                }

                                originalTotalDuties {
                                    amount
                                    currencyCode
                                }

                                shippingAddress {
                                    company
                                    name
                                    firstName
                                    lastName
                                    address1
                                    address2
                                    zip
                                    city
                                    country
                                    countryCodeV2
                                    province
                                    phone
                                }
                                
                                lineItems(first: 99) {
                                    edges {
                                        node {
                                            title
                                            quantity

                                            originalTotalPrice {
                                                amount
                                                currencyCode
                                            }

                                            discountedTotalPrice {
                                                amount
                                                currencyCode
                                            }

                                            variant {
                                                id
                                                title
                                                sku
                                                image {
                                                    url
                                                }

                                                product {
                                                    id
                                                    title
                                                }

                                                unitPrice {
                                                    amount
                                                    currencyCode
                                                }
                                            }
                                        }
                                    }
                                }
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
