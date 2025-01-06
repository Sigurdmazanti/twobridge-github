import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import { RefreshTokenResponseDto } from '../dto/refresh-token.dto';
import { SignInRequestDto } from '../dto/sign-in.dto';
import { SignInResponseDto } from '../dto/sign-in.dto';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';

export interface AuthStrategy {
	signIn(
		credentials: SignInRequestDto,
	): Promise<ApiResponseDto<SignInResponseDto>>;
	refreshToken(
		authHeader: AuthHeadersDto,
	): Promise<ApiResponseDto<RefreshTokenResponseDto>>;
}