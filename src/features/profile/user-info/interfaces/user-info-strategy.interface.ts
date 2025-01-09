import { GetUserInfoResponseDto } from '../dto/get-user-info-response.dto';
import { UpdateUserInfoDto } from '../dto/update-user-info.dto';

export interface UserInfoStrategy {
	getUserInfo(authHeader: string): Promise<GetUserInfoResponseDto>;

	updateUserInfo(
		authHeader: string,
		userInfo: UpdateUserInfoDto,
	): Promise<GetUserInfoResponseDto>;
}
