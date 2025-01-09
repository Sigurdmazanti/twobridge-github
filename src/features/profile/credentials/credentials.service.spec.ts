import { Test, TestingModule } from '@nestjs/testing';
import { CredentialsService } from './credentials.service';
import { HttpService } from '@nestjs/axios';
import * as strategyHelper from 'src/common/helpers/strategy-helper';
import { DynamicwebCredentialsStrategy } from './strategies/dynamicweb-credentials.strategy';
import {
	ChangePasswordRequestDto,
	ChangePasswordResponseDto,
} from './dto/change-password.dto';
import { faker } from '@faker-js/faker/.';

describe('CredentialsService', () => {
	let service: CredentialsService;
	let mockHttpService: HttpService;
	let originalCmsProvider: string | undefined;

	const mockGetStrategyBasedOnConfig = jest.spyOn(
		strategyHelper,
		'getStrategyBasedOnConfig',
	);

	mockGetStrategyBasedOnConfig.mockReturnValue(
		new DynamicwebCredentialsStrategy(mockHttpService),
	);

	beforeEach(async () => {
		// Initialize strategy in the service, so the service can actually run
		// Original value is stored to apply it again after tests have run
		originalCmsProvider = process.env.CMS_PROVIDER;
		process.env.CMS_PROVIDER = 'dynamicweb';

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CredentialsService,
				{
					provide: HttpService,
					useValue: mockHttpService,
				},
			],
		}).compile();

		service = module.get<CredentialsService>(CredentialsService);
		mockHttpService = {} as HttpService;
	});

	afterEach(() => {
		jest.restoreAllMocks();
		process.env.CMS_PROVIDER = originalCmsProvider;
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should correctly initialize the strategy', () => {
		const strategy = service['strategy'];
		expect(strategy).toBeInstanceOf(DynamicwebCredentialsStrategy);
	});

	it('should call changePassword on the strategy', async () => {
		const mockAuthHeader = 'Bearer current-token';

		const mockNewPassword: ChangePasswordRequestDto = {
			password: faker.internet.password(),
		};

		const mockResponse: ChangePasswordResponseDto = {
			message: 'Password changed',
		};

		const changePasswordSpy = jest
			.spyOn(service['strategy'], 'changePassword')
			.mockResolvedValue(mockResponse);

		const result = await service.changePassword(
			mockAuthHeader,
			mockNewPassword,
		);
		expect(changePasswordSpy).toHaveBeenCalledWith(
			mockAuthHeader,
			mockNewPassword,
		);
		expect(result).toEqual(mockResponse);
	});
});
