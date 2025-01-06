import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { HttpService } from '@nestjs/axios';
import * as strategyHelper from 'src/common/helpers/strategy-helper';
import { DynamicwebOrdersStrategy } from './strategies/dynamicweb-orders.strategy';
import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import {
	GetUserOrdersQueryParamsDto,
	GetUserOrdersResponseDto,
} from './dto/get-user-orders.dto';
import { OrderDto } from './dto/order.dto';

describe('OrdersService', () => {
	let service: OrdersService;
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
			new DynamicwebOrdersStrategy(mockHttpService),
		);

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrdersService,
				{
					provide: HttpService,
					useValue: mockHttpService,
				},
			],
		}).compile();

		service = module.get<OrdersService>(OrdersService);
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
		expect(strategy).toBeInstanceOf(DynamicwebOrdersStrategy);
	});

	it('should call getUserOrders on the strategy', async () => {
		const mockAuthHeader: AuthHeadersDto = {
			authorization: 'Bearer current-token',
		};

		const mockQueryParams: GetUserOrdersQueryParamsDto = {
			pageSize: 5,
			sortBy: 'TOTAL_PRICE',
		};

		const mockOrder: OrderDto = {
			id: '123',
			customerCompany: 'KEA',
		};

		const mockResponse: GetUserOrdersResponseDto = {
			totalOrdersCount: 10,
			orders: [mockOrder],
		};

		const getUserOrdersSpy = jest
			.spyOn(service['strategy'], 'getUserOrders')
			.mockResolvedValue(mockResponse);

		const result = await service.getUserOrders(
			mockAuthHeader,
			mockQueryParams,
		);
		expect(getUserOrdersSpy).toHaveBeenCalledWith(
			mockAuthHeader,
			mockQueryParams,
		);
		expect(result).toEqual(mockResponse);
	});
});
