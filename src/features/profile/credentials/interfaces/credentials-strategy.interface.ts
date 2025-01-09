import {
	ChangePasswordRequestDto,
	ChangePasswordResponseDto,
} from '../dto/change-password.dto';

export interface CredentialsStrategy {
	changePassword(
		authHeader: string,
		resetPassword: ChangePasswordRequestDto,
	): Promise<ChangePasswordResponseDto>;
}
