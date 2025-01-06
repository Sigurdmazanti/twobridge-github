import { firstValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { handleError, handleShopifyError } from "../../utils/return-utils";
import { AuthHeadersDto } from "src/common/dto/headers-auth.dto";
import { splitBearerToken } from "../../utils/headers-utils";
import { detectShopifyErrors } from "./get-error-code-util";
import { GetShopifyCustomerIdByTokenResponse } from "src/common/dto/shopify/get-customer-id-by-token.dto";
import { mapGetShopifyCustomerIdByTokenResponse } from "src/common/mapping/shopify/get-customer-id-by-token.mapper";

export async function getShopifyCustomerIdByToken(
    authHeader: AuthHeadersDto,
    httpService: HttpService
): Promise<string> {
    try {
        const query = `query GetCustomerDetails($customerAccessToken: String!) {
			customer(customerAccessToken: $customerAccessToken) {
				id
			}
		}`;

        const splitToken = splitBearerToken(authHeader as any);
        
        const response = await firstValueFrom(
            httpService.post(
                process.env.SHOPIFY_STOREFRONT_API_URL,
                {
                    query: query,
                    variables: {
                        customerAccessToken: splitToken
                    },
                },
                {
                    headers: {
                        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_PUBLIC_KEY,
                    },
                }
            )
        );

        const shopifyErrors = detectShopifyErrors(response.data);

        if (shopifyErrors) {
            response.data = handleShopifyError(shopifyErrors);
        }

        else {
            response.data = mapGetShopifyCustomerIdByTokenResponse(response.data);
        }

        return response.data;

    } catch(error) {
        handleError(error);
    }
}