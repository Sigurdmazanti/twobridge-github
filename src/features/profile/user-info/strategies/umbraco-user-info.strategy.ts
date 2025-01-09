import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
	handleError,
	handleResponse,
} from 'src/common/helpers/utils/return-utils';
import { UserInfoStrategy } from '../interfaces/user-info-strategy.interface';
import { GetUserInfoResponseDto } from '../dto/get-user-info-response.dto';
import { createAuthHeaders } from 'src/common/helpers/utils/headers-utils';
import { UpdateUserInfoDto } from '../dto/update-user-info.dto';

export class UmbracoUserInfoStrategy implements UserInfoStrategy {
	constructor(private readonly httpService: HttpService) {}

	async getUserInfo(
		authHeader: string,
	): Promise<GetUserInfoResponseDto> {
		try {
			const refreshHeaders = createAuthHeaders(authHeader);
			refreshHeaders['Api-Key'] = process.env.UMBRACO_API_KEY;

			const response = await firstValueFrom(
				this.httpService.get(`${process.env.UMBRACO_API_URL}/`, {
					headers: refreshHeaders,
				}),
			);

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
			const refreshHeaders = createAuthHeaders(authHeader);
			refreshHeaders['Api-Key'] = process.env.UMBRACO_API_KEY;

			const response = await firstValueFrom(
				this.httpService.patch(
					`${process.env.UMBRACO_API_URL}/`,
					userInfo,
					{ headers: refreshHeaders },
				),
			);

			return handleResponse(response);
		} catch (error) {
			return handleError(error);
		}
	}
}