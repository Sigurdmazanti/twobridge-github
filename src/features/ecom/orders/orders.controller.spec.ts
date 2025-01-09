import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

import { BadRequestException, HttpException } from '@nestjs/common';
import { sendResponse } from 'src/common/helpers/utils/return-utils';
import { Response } from 'express';
import { testDtoValidation } from 'src/common/helpers/test-helper';
import { axiosError } from 'src/common/helpers/axios-object-helper';
import {
	GetUserOrdersQueryParamsDto,
	GetUserOrdersResponseDto,
} from './dto/get-user-orders.dto';
import { OrderDto } from './dto/order.dto';
import { OrderLineDto } from './dto/orderline.dto';

jest.mock('../../../common/helpers/utils/return-utils');

describe('OrdersController', () => {
	let controller: OrdersController;
	let ordersService: jest.Mocked<OrdersService>;
	let mockExpressResponse: Response;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [OrdersController],
			providers: [
				{
					provide: OrdersService,
					useValue: {
						getUserOrders: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<OrdersController>(OrdersController);
		ordersService = module.get<OrdersService>(
			OrdersService,
		) as jest.Mocked<OrdersService>;
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

	describe('getUserOrders', () => {
		it('should call OrdersService.getUserOrders with the correct token and parameters and return appropiate data', async () => {
			const mockAuthHeader = 'Bearer current-token';

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

			ordersService.getUserOrders.mockResolvedValueOnce(mockResponse);
			await controller.getUserOrders(
				mockAuthHeader,
				mockQueryParams,
				mockExpressResponse,
			);

			expect(ordersService.getUserOrders).toHaveBeenCalledWith(
				mockAuthHeader,
				mockQueryParams,
			);
			expect(sendResponse).toHaveBeenCalledWith(
				mockExpressResponse,
				mockResponse,
			);
			expect(mockResponse.totalOrdersCount).toBe(10);
			expect(mockResponse.orders).toHaveLength(1);
			expect(mockResponse.orders[0]).toEqual(mockOrder);
		});

		it('should throw an exception if OrdersService.getUserOrders fails', async () => {
			const mockAuthHeader = 'invalid token';

			const mockQueryParams: GetUserOrdersQueryParamsDto = {
				pageSize: 5,
				sortBy: 'TOTAL_PRICE',
			};

			ordersService.getUserOrders.mockRejectedValueOnce(axiosError);

			await expect(
				controller.getUserOrders(
					mockAuthHeader,
					mockQueryParams,
					mockExpressResponse,
				),
			).rejects.toThrow(new HttpException('Not Found', 404));
		});
	});

	describe('Orders DTO validation tests', () => {
		it('should validate OrderDto with invalid data types', async () => {
			await expect(testDtoValidation(OrderDto)).rejects.toThrow(
				BadRequestException,
			);
		});

		it('should validate OrderLineDto with invalid data types', async () => {
			await expect(testDtoValidation(OrderLineDto)).rejects.toThrow(
				BadRequestException,
			);
		});
	});
});
