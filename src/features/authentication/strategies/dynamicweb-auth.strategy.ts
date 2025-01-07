import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AuthStrategy } from '../interfaces/auth-strategy.interface';
import { SignInResponseDto, SignInRequestDto } from '../dto/sign-in.dto';
import { RefreshTokenResponseDto } from '../dto/refresh-token.dto';
import {
	handleError,
	handleResponse,
} from 'src/common/helpers/utils/return-utils';
import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import { createAuthHeaders } from 'src/common/helpers/utils/headers-utils';
import { mapDynamicwebSignInResponse } from '../mapping/sign-in.mapper';
import { mapDynamicwebRefreshTokenResponse } from '../mapping/refresh-token.mapper';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';

export class DynamicwebAuthStrategy implements AuthStrategy {
	constructor(private readonly httpService: HttpService) {}

	async signIn(
		credentials: SignInRequestDto,
	): Promise<ApiResponseDto<SignInResponseDto>> {
		try {
			const response = await firstValueFrom(
				this.httpService.post(
					`${process.env.DYNAMICWEB_API_URL}/dwapi/users/authenticate`,
					credentials,
				),
			);

			response.data = mapDynamicwebSignInResponse(response.data);
			return handleResponse(response);
		} catch (error) {
			return handleError(error);
		}
	}

	async refreshToken(
		authHeader: string,
	): Promise<ApiResponseDto<RefreshTokenResponseDto>> {
		try {
			const refreshHeaders = createAuthHeaders(authHeader);

			const response = await firstValueFrom(
				this.httpService.get(
					`${process.env.DYNAMICWEB_API_URL}/dwapi/users/authenticate/refresh`,
					{ headers: refreshHeaders },
				),
			);

			response.data = mapDynamicwebRefreshTokenResponse(response.data);
			return handleResponse(response);
		} catch (error) {
			return handleError(error);
		}
	}
}
