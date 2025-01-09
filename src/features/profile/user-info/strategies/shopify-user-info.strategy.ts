import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
	handleError,
	handleResponse,
	handleShopifyError,
} from 'src/common/helpers/utils/return-utils';
import { UserInfoStrategy } from '../interfaces/user-info-strategy.interface';
import { GetUserInfoResponseDto } from '../dto/get-user-info-response.dto';
import { mapShopifyGetUserInfo } from '../mapping/get-user-info.mapper';
import { splitBearerToken } from 'src/common/helpers/utils/headers-utils';
import { UpdateUserInfoDto } from '../dto/update-user-info.dto';
import { mapShopifyUpdateUserInfoRequest } from '../mapping/update-user-info-mapper';
import { detectShopifyErrors } from 'src/common/helpers/shopify/utils/get-error-code-util';

export class ShopifyUserInfoStrategy implements UserInfoStrategy {
	constructor(private readonly httpService: HttpService) {}

	async getUserInfo(authHeader: string): Promise<GetUserInfoResponseDto> {
		try {
			const token = splitBearerToken(authHeader);

			const query = `query getUserInfo($customerAccessToken: String!) {
                customer(customerAccessToken: $customerAccessToken) {
                    id
                    displayName
                    firstName
                    lastName
                    defaultAddress {
                        address1
                        address2
                        city
                        zip
                        country
                        countryCodeV2
                    }
                    email
                    phone
                }
            }`;

			const response = await firstValueFrom(
				this.httpService.post(
					process.env.SHOPIFY_STOREFRONT_API_URL,
					{
						query: query,
						variables: {
							customerAccessToken: token,
						},
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
				response.data = mapShopifyGetUserInfo(response.data);
			}

			return handleResponse(response);
		} catch (error) {
			return handleError(error);
		}
	}

	async updateUserInfo(
		authHeader: string,
		userInfo: UpdateUserInfoDto,
	): Promise<GetUserInfoResponseDto> {
		try {
			const token = splitBearerToken(authHeader);

			const query = `mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
                customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
                    customer {
                        firstName
                        lastName
                        email
                        phone
                    }
                    customerUserErrors {
                        field
                        message
                        code
                    }
                    userErrors {
                        field
                        message
                    }
                }
            }`;

			const customerUpdateInput =
				mapShopifyUpdateUserInfoRequest(userInfo);

			const response = await firstValueFrom(
				this.httpService.post(
					process.env.SHOPIFY_STOREFRONT_API_URL,
					{
						query: query,
						variables: {
							customerAccessToken: token,
							customer: customerUpdateInput,
						},
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
				response.data = mapShopifyGetUserInfo(response.data);
			}

			return handleResponse(response);
		} catch (error) {
			return handleError(error);
		}
	}
}
