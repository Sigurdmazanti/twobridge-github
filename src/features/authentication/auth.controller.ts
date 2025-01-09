import { Post, Body, Res, Headers, Get, HttpException } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInRequestDto, SignInResponseDto } from './dto/sign-in.dto';
import { sendResponse } from 'src/common/helpers/utils/return-utils';
import {
	ApiBody,
	ApiHeader,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { RefreshTokenResponseDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signIn')
	@ApiOperation({
		summary: 'Sign in as a frontend user.',
	})
	@ApiBody({
		type: SignInRequestDto,
	})
	@ApiOkResponse({
		description: 'Successful sign-in response.',
		type: SignInResponseDto,
	})
	async signIn(@Body() credentials: SignInRequestDto, @Res() res: Response) {
		try {
			const response = await this.authService.signIn(credentials);

			return sendResponse(res, response);
		} catch (error) {
			throw new HttpException(error, error.statusCode);
		}
	}

	@Get('refreshToken')
	@ApiOperation({
		summary: 'Refresh the JWT user access token.',
		description:
			'**Shopify**: Extends the expiration date/time of the token.\n\n**DynamicWeb**: Generates a new access token.',
	})
	@ApiHeader({
		name: 'authorization',
		description: 'The user access token.',
		required: true,
	})
	@ApiOkResponse({
		description: 'Successful refresh token response.',
		type: RefreshTokenResponseDto,
	})
	async refreshToken(
		@Headers('authorization') authHeader: string,
		@Res() res: Response,
	) {
		try {
			const response = await this.authService.refreshToken(authHeader);

			sendResponse(res, response);
		} catch (error) {
			throw new HttpException(error, error.statusCode);
		}
	}
}
