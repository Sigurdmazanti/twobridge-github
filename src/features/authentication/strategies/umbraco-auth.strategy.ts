import { HttpService } from '@nestjs/axios';
import { RefreshTokenResponseDto } from '../dto/refresh-token.dto';
import { AuthStrategy } from '../interfaces/auth-strategy.interface';
import { SignInRequestDto, SignInResponseDto } from '../dto/sign-in.dto';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { firstValueFrom } from 'rxjs';
import { handleError, handleResponse } from 'src/common/helpers/utils/return-utils';
import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import { createAuthHeaders } from 'src/common/helpers/utils/headers-utils';

export class UmbracoAuthStrategy implements AuthStrategy {
	constructor(private readonly httpService: HttpService) {}

	async signIn(
		credentials: SignInRequestDto,
	): Promise<ApiResponseDto<SignInResponseDto>> {
		try {
			const response = await firstValueFrom(
				this.httpService.post(
					`${process.env.UMBRACO_API_URL}/`,
					credentials,
					{
						headers: {
						  'Api-Key': process.env.UMBRACO_API_KEY
						}
					},
				),
			);

			return handleResponse(response);
			
		} catch (error) {
			return handleError(error);
		}
	}

	async refreshToken(
		authHeader: AuthHeadersDto,
	): Promise<ApiResponseDto<RefreshTokenResponseDto>> {
		try {
			const refreshHeaders = createAuthHeaders(authHeader.authorization);
			refreshHeaders['Api-Key'] = process.env.UMBRACO_API_KEY;

			const response = await firstValueFrom(
				this.httpService.get(
					`${process.env.UMBRACO_API_URL}/`,
					{ headers: refreshHeaders },
				),
			);

			return handleResponse(response);

		} catch (error) {
			return handleError(error);
		}
	}
}
