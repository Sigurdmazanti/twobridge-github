import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import { GetUserInfoResponseDto } from '../dto/get-user-info-response.dto';
import { UpdateUserInfoDto } from '../dto/update-user-info.dto';

export interface UserInfoStrategy {
	getUserInfo(authHeader: AuthHeadersDto): Promise<GetUserInfoResponseDto>;

	updateUserInfo(
		authHeader: AuthHeadersDto,
		userInfo: UpdateUserInfoDto,
	): Promise<GetUserInfoResponseDto>;
}
