import {
	Controller,
	Patch,
	Body,
	Res,
	Headers,
	HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { CredentialsService } from './credentials.service';
import { sendResponse } from 'src/common/helpers/utils/return-utils';
import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import { ChangePasswordRequestDto } from './dto/change-password.dto';
import {
	ApiBody,
	ApiHeader,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

@Controller('profile/credentials')
export class CredentialsController {
	constructor(private credentialsService: CredentialsService) {}

	@ApiOperation({
		summary: 'Change the password for the authenticated user.',
	})
	@ApiHeader({
		name: 'authorization',
		description:
			'**Shopify**: The token generated from customRecover-email.\n\n**DynamicWeb**: The user access token.',
		required: true,
	})
	@ApiBody({
		type: ChangePasswordRequestDto,
	})
	@ApiOkResponse({
		description: 'Password changed.',
	})
	@Patch('changePassword')
	async changePassword(
		@Headers() authHeader: AuthHeadersDto,
		@Body() resetPassword: ChangePasswordRequestDto,
		@Res() res: Response,
	) {
		try {
			const response = await this.credentialsService.changePassword(
				authHeader,
				resetPassword,
			);

			return sendResponse(res, response);
		} catch (error) {
			throw new HttpException(error, error.statusCode);
		}
	}
}
