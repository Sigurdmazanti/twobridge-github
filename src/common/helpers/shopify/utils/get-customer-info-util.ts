import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { handleError, handleShopifyError } from '../../utils/return-utils';
import { splitBearerToken } from '../../utils/headers-utils';
import { detectShopifyErrors } from './get-error-code-util';
import { mapGetShopifyCustomerIdByTokenResponse } from 'src/common/mapping/shopify/get-customer-id-by-token.mapper';

/**
 * Retrieves the Shopify customer ID associated with a given customer access token.
 *
 * @param {string} authHeader - The authorization header containing the Bearer token.
 * @param {HttpService} httpService - The HTTP service used to make the API request.
 * @returns {Promise<string>} The Shopify customer ID if successful.
 */
export async function getShopifyCustomerIdByToken(
	authHeader: string,
	httpService: HttpService,
): Promise<string> {
	try {
		const query = `query GetCustomerDetails($customerAccessToken: String!) {
			customer(customerAccessToken: $customerAccessToken) {
				id
			}
		}`;

		const splitToken = splitBearerToken(authHeader);

		const response = await firstValueFrom(
			httpService.post(
				process.env.SHOPIFY_STOREFRONT_API_URL,
				{
					query: query,
					variables: {
						customerAccessToken: splitToken,
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
			response.data = mapGetShopifyCustomerIdByTokenResponse(
				response.data,
			);
		}

		return response.data;
	} catch (error) {
		handleError(error);
	}
}
