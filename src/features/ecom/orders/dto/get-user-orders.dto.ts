import { Transform } from 'class-transformer';
import {
	IsOptional,
	IsNumber,
	IsBoolean,
	IsArray,
	IsString,
	IsDateString,
	IsInstance,
} from 'class-validator';
import {
	stringToNumber,
	stringToArrayOfStrings,
	stringToBoolean,
} from 'src/common/helpers/transform-helper';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { OrderDto } from './order.dto';
import { ApiParam, ApiProperty } from '@nestjs/swagger';

export class GetUserOrdersQueryParamsDto {
	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => stringToNumber(value))
	pageSize?: number;

	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => stringToNumber(value))
	currentPage?: number;

	@IsOptional()
	@IsString()
	afterCursor?: string;

	@IsOptional()
	@IsBoolean()
	@Transform(({ value }) => stringToBoolean(value))
	showPricesWithVat?: boolean;

	@IsOptional()
	@IsDateString()
	fromCompletedDate?: string;

	@IsOptional()
	@IsDateString()
	toCompletedDate?: string;

	@IsOptional()
	@IsBoolean()
	@Transform(({ value }) => stringToBoolean(value))
	byCustomerNumber?: boolean;

	@IsOptional()
	@IsArray()
	@Transform(({ value }) => stringToArrayOfStrings(value))
	filledProperties?: string[];

	@IsOptional()
	@IsString()
	sortBy?: string;

	@IsOptional()
	@IsString()
	sortOrder?: string;

	constructor(
		pageSize?: number,
		currentPage?: number,
		afterCursor?: string,
		showPricesWithVat?: boolean,
		fromCompletedDate?: string,
		toCompletedDate?: string,
		byCustomerNumber?: boolean,
		filledProperties?: string[],
		sortBy?: string,
		sortOrder?: string,
	) {
		this.pageSize = pageSize;
		this.currentPage = currentPage;
		this.afterCursor = afterCursor;
		this.showPricesWithVat = showPricesWithVat;
		this.fromCompletedDate = fromCompletedDate;
		this.toCompletedDate = toCompletedDate;
		this.byCustomerNumber = byCustomerNumber;
		this.filledProperties = filledProperties;
		this.sortBy = sortBy;
		this.sortOrder = sortOrder;
	}
}

export class GetUserOrdersResponseDto extends ApiResponseDto {
	@ApiProperty()
	@IsOptional()
	@IsNumber()
	totalOrdersCount?: number;

	@ApiProperty({ type: [OrderDto] })
	@IsOptional()
	@IsArray()
	@IsInstance(OrderDto, { each: true })
	orders?: OrderDto[];

	@ApiProperty()
	@IsOptional()
	@IsString()
	afterCursor?: string;

	constructor(
		totalOrdersCount?: number,
		orders?: OrderDto[],
		afterCursor?: string,
	) {
		super();
		this.totalOrdersCount = totalOrdersCount;
		this.orders = orders;
		this.afterCursor = afterCursor;
	}
}
