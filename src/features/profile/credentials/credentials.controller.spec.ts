import { Test, TestingModule } from '@nestjs/testing';
import { CredentialsController } from './credentials.controller';
import { CredentialsService } from './credentials.service';
import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import { faker } from '@faker-js/faker/.';
import { Response } from 'express';
import {
	ChangePasswordRequestDto,
	ChangePasswordResponseDto,
} from './dto/change-password.dto';
import { axiosError } from 'src/common/helpers/axios-object-helper';
import { HttpException } from '@nestjs/common';
import { sendResponse } from 'src/common/helpers/utils/return-utils';

jest.mock('../../../common/helpers/utils/return-utils');

describe('CredentialsController', () => {
	let controller: CredentialsController;
	let credentialsService: jest.Mocked<CredentialsService>;
	let mockExpressResponse: Response;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CredentialsController],
			providers: [
				{
					provide: CredentialsService,
					useValue: {
						changePassword: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<CredentialsController>(CredentialsController);
		credentialsService = module.get<CredentialsService>(
			CredentialsService,
		) as jest.Mocked<CredentialsService>;
		mockExpressResponse = {
			send: jest.fn(),
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('changePassword', () => {
		it('should call CredentialsService.changePassword with the correct token', async () => {
			const mockAuthHeader: AuthHeadersDto = {
				authorization: 'Bearer current-token',
			};

			const mockResponse: ChangePasswordResponseDto = {
				message: 'Password changed successfully',
			};

			const mockNewPassword: ChangePasswordRequestDto = {
				password: faker.internet.password(),
			};

			credentialsService.changePassword.mockResolvedValue(mockResponse);

			await controller.changePassword(
				mockAuthHeader,
				mockNewPassword,
				mockExpressResponse,
			);

			expect(credentialsService.changePassword).toHaveBeenCalledWith(
				mockAuthHeader,
				mockNewPassword,
			);

			expect(sendResponse).toHaveBeenCalledWith(
				mockExpressResponse,
				mockResponse,
			);
		});

		it('should throw an exception if CredentialsService.changePassword', async () => {
			const mockAuthHeader: AuthHeadersDto = {
				authorization: 'Invalid token',
			};

			const mockNewPassword: ChangePasswordRequestDto = {
				password: faker.internet.password(),
			};

			credentialsService.changePassword.mockRejectedValueOnce(axiosError);

			await expect(
				controller.changePassword(
					mockAuthHeader,
					mockNewPassword,
					mockExpressResponse,
				),
			).rejects.toThrow(new HttpException('Not Found', 404));
		});
	});
});
