import { Controller, Get, Headers, Res, Query, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { OrdersService } from './orders.service';
import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import { sendResponse } from 'src/common/helpers/utils/return-utils';
import { GetUserOrdersQueryParamsDto, GetUserOrdersResponseDto } from './dto/get-user-orders.dto';
import { ApiHeader, ApiOkResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('ecom/orders')
export class OrdersController {
	constructor(private ordersService: OrdersService) {}

	@Get('getUserOrders')
	@ApiOperation({ 
		summary: 'Get the orders of the authenticated user.',
	})

	@ApiHeader({
		name: 'authorization',
		description: '**Shopify & Dynamicweb**: The user access token. <br> **Umbraco**: customerReference OR email',
		required: true,
	})

	@ApiQuery({
		name: 'pageSize',
		description: 'The number of orders per page.',
		required: false
	})

	@ApiQuery({
		name: 'currentPage',
		description: 'The current page.',
		required: false
	})

	@ApiQuery({
		name: 'sortBy',
		description: '**Shopify & DynamicWeb only** What to sort the orders by.',
		required: false
	})

	@ApiQuery({
		name: 'afterCursor',
		description: '**Shopify only** The afterCursor for pagination.',
		required: false
	})

	@ApiOkResponse({
		type: GetUserOrdersResponseDto
	})

	async getUserOrders(
		@Headers() authHeader: AuthHeadersDto,
		@Query() queryParams: GetUserOrdersQueryParamsDto,
		@Res() res: Response,
	) {
		try {
			const response = await this.ordersService.getUserOrders(
				authHeader,
				queryParams,
			);

			return sendResponse(res, response);
			
		} catch (error) {
			throw new HttpException(error, error.statusCode);
		}
	}
}
