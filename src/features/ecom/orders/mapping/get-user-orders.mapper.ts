import {
	GetUserOrdersQueryParamsDto,
	GetUserOrdersResponseDto,
} from '../dto/get-user-orders.dto';
import { mapDynamicwebOrder } from '../../shared/mapping/dynamicweb/order.mapper';
import { mapShopifyOrder } from '../../shared/mapping/shopify/order.mapper';
import { mapUmbracoOrder } from '../../shared/mapping/umbraco/order.mapper';

export const mapDynamicwebGetUserOrdersQueryParams = (
	q: Partial<GetUserOrdersQueryParamsDto>,
): Partial<GetUserOrdersQueryParamsDto> => {
	const r: Partial<GetUserOrdersQueryParamsDto> = {};

	if (q.pageSize) r.pageSize = q.pageSize;
	if (q.currentPage) r.currentPage = q.currentPage;
	if (q.showPricesWithVat) r.showPricesWithVat = q.showPricesWithVat;
	if (q.fromCompletedDate) r.fromCompletedDate = q.fromCompletedDate;
	if (q.toCompletedDate) r.toCompletedDate = q.toCompletedDate;
	if (q.byCustomerNumber) r.byCustomerNumber = q.byCustomerNumber;
	if (q.filledProperties) r.filledProperties = q.filledProperties;
	if (q.sortBy) r.sortBy = q.sortBy;
	if (q.sortOrder) r.sortOrder = q.sortOrder;

	return r;
};

export const mapDynamicwebGetUserOrdersResponse = (
	q: Partial<GetUserOrdersResponseDto>,
): Partial<GetUserOrdersResponseDto> => {
	const r: Partial<GetUserOrdersResponseDto> = {};

	if(q.totalOrdersCount) r.totalOrdersCount = q.totalOrdersCount;
	r.orders = q.orders.map((order) => mapDynamicwebOrder(order));

	return r;
};

export const mapShopifyGetUserOrdersQueryParams = (
	q: Partial<GetUserOrdersQueryParamsDto>,
): Partial<GetUserOrdersQueryParamsDto> => {
	const r: Partial<GetUserOrdersQueryParamsDto> = {};

	if (q.pageSize) r.pageSize = q.pageSize;
	if (q.afterCursor) r.afterCursor = q.afterCursor;
	if (q.showPricesWithVat) r.showPricesWithVat = q.showPricesWithVat;
	if (q.fromCompletedDate) r.fromCompletedDate = q.fromCompletedDate;
	if (q.toCompletedDate) r.toCompletedDate = q.toCompletedDate;
	if (q.byCustomerNumber) r.byCustomerNumber = q.byCustomerNumber;
	if (q.filledProperties) r.filledProperties = q.filledProperties;
	if (q.sortBy) r.sortBy = q.sortBy;

	return r;
};

export const mapShopifyGetUserOrdersResponse = (
	q: any,
): Partial<GetUserOrdersResponseDto> => {
	const r: Partial<GetUserOrdersResponseDto> = {};
	const c = q.data?.customer;
	const o = c?.orders;
	const oEdges = o?.edges;

	const cInfo = {
		id: c?.id,
		displayName: c?.displayName,
		firstName: c?.firstName,
		lastName: c?.lastName,
		phone: c?.phone,
		email: c?.email,
		defaultAddress: {
			address1: c?.defaultAddress?.address1,
			address2: c?.defaultAddress?.address2,
			zip: c?.defaultAddress?.zip,
			city: c?.defaultAddress?.city,
			country: c?.defaultAddress?.country,
			countryCodeV2: c?.defaultAddress?.countryCodeV2,
			company: c?.defaultAddress?.company,
			province: c?.defaultAddress?.province,
		},
	};

	if(o.totalCount) r.totalOrdersCount = !isNaN(Number(o.totalCount)) ? Number(o.totalCount) : 0;
	if(o.pageInfo?.endCursor) r.afterCursor = o.pageInfo.endCursor;
	
	r.orders = oEdges.map((order: any) => mapShopifyOrder(order.node, cInfo));

	return r;
};

export const mapUmbracoGetUserOrdersResponse = (
	q: Partial<GetUserOrdersResponseDto>,
	queryParams: GetUserOrdersQueryParamsDto
): Partial<GetUserOrdersResponseDto> => {
	const r: Partial<GetUserOrdersResponseDto> = {};

	if(Array.isArray(q) && q.length) {
		r.totalOrdersCount = q.length;

		if (queryParams?.pageSize) {
			const pageSize = queryParams.pageSize;
			const currentPage = queryParams.currentPage || 1;
			const startIndex = (currentPage - 1) * pageSize;
			const endIndex = startIndex + pageSize;
			r.orders = q.slice(startIndex, endIndex);
		}

		r.orders = q.map((order) => mapUmbracoOrder(order));
	}

	return r;
};