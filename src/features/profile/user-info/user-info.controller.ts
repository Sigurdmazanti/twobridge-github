import { Controller, Get, Headers, Patch, Res, Body, HttpException } from '@nestjs/common';
import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import { UserInfoService } from './user-info.service';
import { sendResponse } from 'src/common/helpers/utils/return-utils';
import { Response } from 'express';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { ApiBody, ApiHeader, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GetUserInfoResponseDto } from './dto/get-user-info-response.dto';

@Controller('profile/user-info')
export class UserInfoController {
	constructor(private userInfoService: UserInfoService) {}

	@Get('getUserInfo')
	@ApiOperation({ 
		summary: 'Get the info of the authenticated user.',
	})

	@ApiHeader({
		name: 'authorization',
		description: 'The user access token.',
		required: true,
	})
	
	@ApiOkResponse({
		description: 'Successful get user info response.',
        type: GetUserInfoResponseDto,
    })
	
	async getUserInfo(
		@Headers() authHeader: AuthHeadersDto,
		@Res() res: Response,
	) {
		try {
			const response = await this.userInfoService.getUserInfo(authHeader);
			sendResponse(res, response);

		} catch (error) {
			throw new HttpException(error, error.statusCode);
		}
	}

	@Patch('updateUserInfo')
	@ApiOperation({ 
		summary: 'Update the info of the authenticated user.',
	})

	@ApiHeader({
		name: 'authorization',
		description: 'The user access token.',
		required: true,
	})

	@ApiBody({
		type: UpdateUserInfoDto
	})
	
	@ApiOkResponse({
		description: 'Successful get user info response.',
        type: GetUserInfoResponseDto,
    })

	async updateUserInfo(
		@Headers() authHeader: AuthHeadersDto,
		@Body() userInfo: UpdateUserInfoDto,
		@Res() res: Response,
	) {
		try {
			const response = await this.userInfoService.updateUserInfo(
				authHeader,
				userInfo,
			);
			
			sendResponse(res, response);
			
		} catch (error) {
			throw new HttpException(error, error.statusCode);
		}
	}
}
