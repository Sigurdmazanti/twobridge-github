import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import {
	GetUserOrdersQueryParamsDto,
	GetUserOrdersResponseDto,
} from '../dto/get-user-orders.dto';
export interface OrdersStrategy {
	getUserOrders(
		authHeader: AuthHeadersDto,
		queryParams: GetUserOrdersQueryParamsDto,
	): Promise<GetUserOrdersResponseDto>;
}
