import { Test, TestingModule } from '@nestjs/testing';
import { UserInfoController } from './user-info.controller';
import { UserInfoService } from './user-info.service';
import { Response } from 'express';
import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import { axiosError } from 'src/common/helpers/axios-object-helper';
import { HttpException } from '@nestjs/common';
import { GetUserInfoResponseDto } from './dto/get-user-info-response.dto';
import { faker } from '@faker-js/faker/.';
import { sendResponse } from 'src/common/helpers/utils/return-utils';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

jest.mock('../../../common/helpers/utils/return-utils');

describe('UserInfoController', () => {
	let controller: UserInfoController;
	let userInfoService: jest.Mocked<UserInfoService>;
	let mockExpressResponse: Response;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserInfoController],
			providers: [
				{
					provide: UserInfoService,
					useValue: {
						getUserInfo: jest.fn(),
						updateUserInfo: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<UserInfoController>(UserInfoController);
		userInfoService = module.get<UserInfoService>(
			UserInfoService,
		) as jest.Mocked<UserInfoService>;
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

	describe('getUserInfo', () => {
		it('should call UserInfoService.getUserInfo with the correct credentials and return appropiate data', async () => {
			const mockAuthHeader: AuthHeadersDto = {
				authorization: 'Bearer token'
			};

			const mockResponse: GetUserInfoResponseDto = {
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
				name: faker.person.fullName()
			};

			userInfoService.getUserInfo.mockResolvedValueOnce(mockResponse);

			await controller.getUserInfo(mockAuthHeader, mockExpressResponse);
			expect(userInfoService.getUserInfo).toHaveBeenCalledWith(mockAuthHeader);
			expect(sendResponse).toHaveBeenCalledWith(
				mockExpressResponse,
				mockResponse,
			);
		})

		it('should throw an exception if UserInfoService.getUserInfo fails', async () => {
			const mockAuthHeader: AuthHeadersDto = {
				authorization: 'Bearer token'
			};

			userInfoService.getUserInfo.mockRejectedValueOnce(axiosError);

			await expect(
				controller.getUserInfo(mockAuthHeader, mockExpressResponse),
			).rejects.toThrow(new HttpException('Not Found', 404));
		});
	});

	describe('updateUserInfo', () => {
		it('should call UserInfoService.updateUserInfo with the correct credentials and return appropiate data', async () => {
			const mockAuthHeader: AuthHeadersDto = {
				authorization: 'Bearer token'
			};

			const mockUpdatedUserInfo: UpdateUserInfoDto = {
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
				name: faker.person.fullName()
			}

			const mockResponse: GetUserInfoResponseDto = {
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
				name: faker.person.fullName()
			};

			userInfoService.updateUserInfo.mockResolvedValueOnce(mockResponse);

			await controller.updateUserInfo(mockAuthHeader, mockUpdatedUserInfo, mockExpressResponse);
			expect(userInfoService.updateUserInfo).toHaveBeenCalledWith(mockAuthHeader, mockUpdatedUserInfo);
			expect(sendResponse).toHaveBeenCalledWith(
				mockExpressResponse,
				mockResponse,
			);
		})

		it('should throw an exception if UserInfoService.updateUserInfo fails', async () => {
			const mockAuthHeader: AuthHeadersDto = {
				authorization: 'Invalid token'
			};

			const mockUpdatedUserInfo: UpdateUserInfoDto = {
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
				name: faker.person.fullName()
			}

			userInfoService.updateUserInfo.mockRejectedValueOnce(axiosError);

			await expect(
				controller.updateUserInfo(mockAuthHeader, mockUpdatedUserInfo, mockExpressResponse),
			).rejects.toThrow(new HttpException('Not Found', 404));
		});
	});
});
