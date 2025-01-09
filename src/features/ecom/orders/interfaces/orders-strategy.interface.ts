import {
	GetUserOrdersQueryParamsDto,
	GetUserOrdersResponseDto,
} from '../dto/get-user-orders.dto';

export interface OrdersStrategy {
	getUserOrders(
		authHeader: string,
		queryParams: GetUserOrdersQueryParamsDto,
	): Promise<GetUserOrdersResponseDto>;
}
