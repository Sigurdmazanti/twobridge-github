import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, HttpException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInRequestDto, SignInResponseDto } from './dto/sign-in.dto';
import { sendResponse } from 'src/common/helpers/utils/return-utils';
import { Response } from 'express';
import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import { RefreshTokenResponseDto } from './dto/refresh-token.dto';
import { testDtoValidation } from 'src/common/helpers/test-helper';
import { axiosError } from 'src/common/helpers/axios-object-helper';

jest.mock('../../common/helpers/utils/return-utils');

describe('AuthController', () => {
	let controller: AuthController;
	let authService: jest.Mocked<AuthService>;
	let mockExpressResponse: Response;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: AuthService,
					useValue: {
						signIn: jest.fn(),
						refreshToken: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<AuthController>(AuthController);
		authService = module.get<AuthService>(
			AuthService,
		) as jest.Mocked<AuthService>;
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

	describe('signIn', () => {
		it('should call AuthService.signIn with the correct credentials and return appropiate data', async () => {
			const mockCredentials: SignInRequestDto = {
				username: faker.internet.username(),
				password: faker.internet.password(),
			};

			const mockResponse: SignInResponseDto = {
				token: 'token',
			};

			authService.signIn.mockResolvedValueOnce(mockResponse);

			await controller.signIn(mockCredentials, mockExpressResponse);

			expect(authService.signIn).toHaveBeenCalledWith(mockCredentials);
			expect(sendResponse).toHaveBeenCalledWith(
				mockExpressResponse,
				mockResponse,
			);
		});

		it('should throw an exception if AuthService.signIn fails', async () => {
			const mockCredentials: SignInRequestDto = {
				username: faker.internet.username(),
				password: faker.internet.password(),
			};

			authService.signIn.mockRejectedValueOnce(axiosError);

			await expect(
				controller.signIn(mockCredentials, mockExpressResponse),
			).rejects.toThrow(new HttpException('Not Found', 404));
		});
	});

	describe('refreshToken', () => {
		it('should call AuthService.refreshToken and return the correct response', async () => {
			const mockAuthHeader: AuthHeadersDto = {
				authorization: 'Bearer current-token',
			};

			const mockResponse: RefreshTokenResponseDto = {
				token: 'new-token',
			};

			authService.refreshToken.mockResolvedValueOnce(mockResponse);

			await controller.refreshToken(mockAuthHeader, mockExpressResponse);

			expect(authService.refreshToken).toHaveBeenCalledWith(
				mockAuthHeader,
			);
			expect(sendResponse).toHaveBeenCalledWith(
				mockExpressResponse,
				mockResponse,
			);
		});

		it('should throw an exception if AuthService.refreshToken fails', async () => {
			const mockData: AuthHeadersDto = {
				authorization: 'Bearer token',
			};

			authService.refreshToken.mockRejectedValueOnce(axiosError);

			await expect(
				controller.refreshToken(mockData, mockExpressResponse),
			).rejects.toThrow(new HttpException('Not Found', 404));
		});
	});

	describe('Authentication DTO validation tests', () => {
		it('should validate RefreshTokenResponseDto with invalid data types', async () => {
			await expect(
				testDtoValidation(RefreshTokenResponseDto),
			).rejects.toThrow(BadRequestException);
		});

		it('should validate SignInResponseDto with invalid data types', async () => {
			await expect(testDtoValidation(SignInResponseDto)).rejects.toThrow(
				BadRequestException,
			);
		});

		it('should validate SignInRequestDto with invalid data types', async () => {
			await expect(testDtoValidation(SignInRequestDto)).rejects.toThrow(
				BadRequestException,
			);
		});
	});
});
