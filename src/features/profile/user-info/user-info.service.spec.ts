import { Test, TestingModule } from '@nestjs/testing';
import { UserInfoService } from './user-info.service';
import { HttpService } from '@nestjs/axios';
import * as strategyHelper from 'src/common/helpers/strategy-helper';
import { DynamicwebUserInfoStrategy } from './strategies/dynamicweb-user-info.strategy';
import { GetUserInfoResponseDto } from './dto/get-user-info-response.dto';
import { faker } from '@faker-js/faker/.';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

describe('UserInfoService', () => {
	let service: UserInfoService;
	let mockHttpService: HttpService;
	let originalCmsProvider: string | undefined;

	const mockGetStrategyBasedOnConfig = jest.spyOn(
		strategyHelper,
		'getStrategyBasedOnConfig',
	);

	mockGetStrategyBasedOnConfig.mockReturnValue(
		new DynamicwebUserInfoStrategy(mockHttpService),
	);

	beforeEach(async () => {
		// Initialize strategy in the service, so the service can actually run
		// Original value is stored to apply it again after tests have run
		originalCmsProvider = process.env.CMS_PROVIDER;
		process.env.CMS_PROVIDER = 'dynamicweb';

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserInfoService,
				{
					provide: HttpService,
					useValue: mockHttpService,
				},
			],
		}).compile();

		service = module.get<UserInfoService>(UserInfoService);
		mockHttpService = {} as HttpService;
	});

	afterEach(() => {
		jest.restoreAllMocks();
		process.env.CMS_PROVIDER = originalCmsProvider;
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should call getUserInfo on the strategy', async () => {
		const mockAuthHeader = 'Bearer token';

		const mockResponse: GetUserInfoResponseDto = {
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			name: faker.person.fullName(),
		};

		const getUserInfoSpy = jest
			.spyOn(service['strategy'], 'getUserInfo')
			.mockResolvedValue(mockResponse);

		const result = await service.getUserInfo(mockAuthHeader);
		expect(getUserInfoSpy).toHaveBeenCalledWith(mockAuthHeader);
		expect(result).toEqual(mockResponse);
	});

	it('should call updateUserInfo on the strategy', async () => {
		const mockAuthHeader = 'Bearer token';

		const mockUpdatedUserInfo: UpdateUserInfoDto = {
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			name: faker.person.fullName(),
		};

		const mockResponse: GetUserInfoResponseDto = {
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			name: faker.person.fullName(),
		};

		const updateUserInfoSpy = jest
			.spyOn(service['strategy'], 'updateUserInfo')
			.mockResolvedValue(mockResponse);

		const result = await service.updateUserInfo(
			mockAuthHeader,
			mockUpdatedUserInfo,
		);
		expect(updateUserInfoSpy).toHaveBeenCalledWith(
			mockAuthHeader,
			mockUpdatedUserInfo,
		);
		expect(result).toEqual(mockResponse);
	});
});
