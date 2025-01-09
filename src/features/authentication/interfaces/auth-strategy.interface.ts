import { RefreshTokenResponseDto } from '../dto/refresh-token.dto';
import { SignInRequestDto } from '../dto/sign-in.dto';
import { SignInResponseDto } from '../dto/sign-in.dto';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';

export interface AuthStrategy {
	signIn(
		credentials: SignInRequestDto,
	): Promise<ApiResponseDto<SignInResponseDto>>;
	refreshToken(
		authHeader: string,
	): Promise<ApiResponseDto<RefreshTokenResponseDto>>;
}
