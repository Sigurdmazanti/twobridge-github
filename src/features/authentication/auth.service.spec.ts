import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { HttpService } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { SignInRequestDto, SignInResponseDto } from './dto/sign-in.dto';
import * as strategyHelper from 'src/common/helpers/strategy-helper';
import { DynamicwebAuthStrategy } from './strategies/dynamicweb-auth.strategy';
import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import { RefreshTokenResponseDto } from './dto/refresh-token.dto';

describe('AuthService', () => {
	let service: AuthService;
	let mockHttpService: HttpService;
	let originalCmsProvider: string | undefined;

	const mockGetStrategyBasedOnConfig = jest.spyOn(
		strategyHelper,
		'getStrategyBasedOnConfig',
	);

	beforeEach(async () => {
		// Initialize strategy in the service, so the service can actually run
		// Original value is stored to apply it again after tests have run
		originalCmsProvider = process.env.CMS_PROVIDER;
		process.env.CMS_PROVIDER = 'dynamicweb';

		mockGetStrategyBasedOnConfig.mockReturnValue(
			new DynamicwebAuthStrategy(mockHttpService),
		);

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: HttpService,
					useValue: mockHttpService,
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
		mockHttpService = {} as HttpService;
	});

	afterEach(() => {
		jest.restoreAllMocks();
		process.env.CMS_PROVIDER = originalCmsProvider;
	});

	it('should be defined', () => {
		expect(service).toBeUndefined();
	});

	it('should correctly initialize the strategy', () => {
		const strategy = service['strategy'];
		expect(strategy).toBeInstanceOf(DynamicwebAuthStrategy);
	});

	it('should call signIn on the strategy', async () => {
		const mockCredentials: SignInRequestDto = {
		  username: faker.internet.username(),
		  password: faker.internet.password(),
		};
	  
		const mockResponse: SignInResponseDto = { 
			token: 'token' 
		};
	  
		const signInSpy = jest.spyOn(service['strategy'], 'signIn').mockResolvedValue(mockResponse);
	  
		const result = await service.signIn(mockCredentials);
		expect(signInSpy).toHaveBeenCalledWith(mockCredentials);
		expect(result).toEqual(mockResponse);
	});

	it('should call refreshToken on the strategy', async () => {
		const mockAuthHeader: AuthHeadersDto = {
			authorization: 'Bearer current-token',
		};

		const mockResponse: RefreshTokenResponseDto = {
			token: 'new-token',
		};

		const refreshTokenSpy = jest.spyOn(service['strategy'], 'refreshToken').mockResolvedValue(mockResponse);
	  
		const result = await service.refreshToken(mockAuthHeader);
		expect(refreshTokenSpy).toHaveBeenCalledWith(mockAuthHeader);
		expect(result).toEqual(mockResponse);
	});
});
