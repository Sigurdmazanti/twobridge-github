import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AuthStrategy } from '../interfaces/auth-strategy.interface';
import { SignInResponseDto, SignInRequestDto } from '../dto/sign-in.dto';
import { RefreshTokenResponseDto } from '../dto/refresh-token.dto';
import {
	handleError,
	handleResponse,
	handleShopifyError,
} from 'src/common/helpers/utils/return-utils';
import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import { mapShopifySignInResponse } from '../mapping/sign-in.mapper';
import { mapShopifyRefreshTokenResponse } from '../mapping/refresh-token.mapper';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { detectShopifyErrors } from 'src/common/helpers/shopify/utils/get-error-code-util';
import { splitBearerToken } from 'src/common/helpers/utils/headers-utils';

export class ShopifyAuthStrategy implements AuthStrategy {
	constructor(private readonly httpService: HttpService) {}

	async signIn(
		credentials: SignInRequestDto,
	): Promise<ApiResponseDto<SignInResponseDto>> {
		try {
			const query = `mutation SignInWithEmailAndPassword(
                $email: String!, 
                $password: String!,
            ) {
                customerAccessTokenCreate(input: { 
                    email: $email, 
                    password: $password,
                }) {
                    customerAccessToken {
                        accessToken
                    }
                    customerUserErrors {
                        field
                        code
                        message
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
							email: credentials.username,
							password: credentials.password,
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
				response.data = mapShopifySignInResponse(response);
			}

			return handleResponse(response);
		} catch (error) {
			return handleError(error);
		}
	}

	async refreshToken(
		authHeader: string,
	): Promise<ApiResponseDto<RefreshTokenResponseDto>> {
		try {
			const token = splitBearerToken(authHeader);

			const query = `mutation SignInWithAccessToken(
                $customerAccessToken: String!
            ) {
                customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
                    customerAccessToken {
                        accessToken
                        expiresAt
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
				response.data = mapShopifyRefreshTokenResponse(response);
			}

			return handleResponse(response);
		} catch (error) {
			return handleError(error);
		}
	}
}
