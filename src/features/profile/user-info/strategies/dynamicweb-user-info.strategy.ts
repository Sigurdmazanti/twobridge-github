import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import {
	handleError,
	handleResponse,
} from 'src/common/helpers/utils/return-utils';
import { UserInfoStrategy } from '../interfaces/user-info-strategy.interface';
import { GetUserInfoResponseDto } from '../dto/get-user-info-response.dto';
import { mapDynamicwebGetUserInfo } from '../mapping/get-user-info.mapper';
import { createAuthHeaders } from 'src/common/helpers/utils/headers-utils';
import { UpdateUserInfoDto } from '../dto/update-user-info.dto';
import { mapDynamicwebUpdateUserInfo } from '../mapping/update-user-info-mapper';

export class DynamicwebUserInfoStrategy implements UserInfoStrategy {
	constructor(private readonly httpService: HttpService) {}

	async getUserInfo(
		authHeader: AuthHeadersDto,
	): Promise<GetUserInfoResponseDto> {
		try {
			const refreshHeaders = createAuthHeaders(authHeader.authorization);

			const response = await firstValueFrom(
				this.httpService.get(
					`${process.env.DYNAMICWEB_API_URL}/dwapi/users/info`,
					{ headers: refreshHeaders },
				),
			);

			response.data = mapDynamicwebGetUserInfo(response.data);
			return handleResponse(response);
		} catch (error) {
			return handleError(error);
		}
	}

	async updateUserInfo(
		authHeader: AuthHeadersDto,
		userInfo: UpdateUserInfoDto,
	): Promise<GetUserInfoResponseDto> {
		try {
			const refreshHeaders = createAuthHeaders(authHeader.authorization);

			const response = await firstValueFrom(
				this.httpService.patch(
					`${process.env.DYNAMICWEB_API_URL}/dwapi/users/info`,
					userInfo,
					{ headers: refreshHeaders },
				),
			);

			response.data = mapDynamicwebUpdateUserInfo(response.data);
			return handleResponse(response);
			
		} catch (error) {
			return handleError(error);
		}
	}
}
