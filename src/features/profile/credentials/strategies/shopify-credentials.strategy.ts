import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CredentialsStrategy } from '../interfaces/credentials-strategy.interface';
import {
	handleError,
	handleResponse,
	handleShopifyError,
} from 'src/common/helpers/utils/return-utils';
import {
	ChangePasswordRequestDto,
	ChangePasswordResponseDto,
} from '../dto/change-password.dto';
import { splitBearerToken } from 'src/common/helpers/utils/headers-utils';
import { getShopifyCustomerIdByToken } from 'src/common/helpers/shopify/utils/get-customer-info-util';
import { detectShopifyErrors } from 'src/common/helpers/shopify/utils/get-error-code-util';

export class ShopifyCredentialsStrategy implements CredentialsStrategy {
	constructor(private readonly httpService: HttpService) {}

	async changePassword(
		authHeader: string,
		resetPassword: ChangePasswordRequestDto,
	): Promise<ChangePasswordResponseDto> {
		try {
			const id = await getShopifyCustomerIdByToken(
				authHeader,
				this.httpService,
			);
			const token = splitBearerToken(authHeader);

			const query = `mutation customerReset($id: ID!, $input: CustomerResetInput!) {
                customerReset(id: $id, input: $input) {
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

			const response = await firstValueFrom(
				this.httpService.post(
					process.env.SHOPIFY_STOREFRONT_API_URL,
					{
						query: query,
						variables: {
							id: id,
							input: {
								password: resetPassword.password,
								resetToken: token,
							},
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
			}

			return handleResponse(response);
		} catch (error) {
			return handleError(error);
		}
	}
}
