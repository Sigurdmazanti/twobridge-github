import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import {
	ChangePasswordRequestDto,
	ChangePasswordResponseDto,
} from '../dto/change-password.dto';

export interface CredentialsStrategy {
	changePassword(
		authHeader: AuthHeadersDto,
		resetPassword: ChangePasswordRequestDto,
	): Promise<ChangePasswordResponseDto>;
}
