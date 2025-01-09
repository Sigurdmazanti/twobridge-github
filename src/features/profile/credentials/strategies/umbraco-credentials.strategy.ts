import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CredentialsStrategy } from '../interfaces/credentials-strategy.interface';
import {
	handleError,
	handleResponse,
} from 'src/common/helpers/utils/return-utils';
import {
	ChangePasswordRequestDto,
	ChangePasswordResponseDto,
} from '../dto/change-password.dto';
import { createAuthHeaders } from 'src/common/helpers/utils/headers-utils';

export class UmbracoCredentialsStrategy implements CredentialsStrategy {
	constructor(private readonly httpService: HttpService) {}

	async changePassword(
		authHeader: string,
		resetPassword: ChangePasswordRequestDto,
	): Promise<ChangePasswordResponseDto> {
		try {
			const refreshHeaders = createAuthHeaders(authHeader);
			refreshHeaders['Api-Key'] = process.env.UMBRACO_API_KEY;

			const response = await firstValueFrom(
				this.httpService.patch(
					`${process.env.UMBRACO_API_URL}/`,
					{ password: resetPassword.password },
					{ headers: refreshHeaders },
				),
			);

			return handleResponse(response);
		} catch (error) {
			return handleError(error);
		}
	}
}
