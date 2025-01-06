import {
	IsString,
	IsNumber,
	IsBoolean,
	IsArray,
	IsOptional,
	IsInstance,
} from 'class-validator';
import { OrderLineDto } from './orderline.dto';
import { PriceDto, PriceBeforeDiscountDto } from '../../shared/dto/price.dto';
import { ShippingMethodDto } from '../../shared/dto/shippingmethod.dto';
import { PaymentMethodDto } from '../../shared/dto/paymentmethod.dto';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
	@ApiProperty()
	@IsOptional()
	@IsString()
	currencyCode?: string;

	@ApiProperty()
	@ApiProperty()
	@IsOptional()
	@IsString()
	countryCode?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	languageId?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	id?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	secret?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	secondaryUserId?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	secondaryUserName?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	shopId?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	createdAt?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	modified?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	completedDate?: string;

	@ApiProperty()
	@IsOptional()
	@IsBoolean()
	completed?: boolean;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	customerUserId?: number;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerNumber?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerEan?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerRefId?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerCompany?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerTitle?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerName?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerFirstName?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerSurname?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerMiddleName?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerHouseNumber?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerInitials?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerPrefix?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerAddress?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerAddress2?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerZip?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerCity?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerCountry?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerCountryCode?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerRegion?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerPhone?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerEmail?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerCell?: string;

	@ApiProperty()
	@IsOptional()
	@IsBoolean()
	customerAccepted?: boolean;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerComment?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	deliveryCompany?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	deliveryName?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	deliveryFirstName?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	deliverySurname?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	deliveryMiddleName?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	deliveryTitle?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	deliveryHouseNumber?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	deliveryInitials?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	deliveryPrefix?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	deliveryAddress?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	deliveryAddress2?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	deliveryZip?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	deliveryCity?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	deliveryCountry?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	deliveryCountryCode?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	deliveryRegion?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	deliveryPhone?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	deliveryEmail?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	deliveryCell?: string;

	@ApiProperty({ type: [OrderLineDto] })
	@IsOptional()
	@IsArray()
	@IsInstance(OrderLineDto, { each: true })
	orderLines?: OrderLineDto[];

	@ApiProperty()
	@IsOptional()
	@IsInstance(PriceDto)
	price?: PriceDto;

	@ApiProperty()
	@IsOptional()
	@IsInstance(PriceBeforeDiscountDto)
	totalPriceWithoutDiscountsFeesAndTaxes?: PriceBeforeDiscountDto;

	@ApiProperty()
	@IsOptional()
	@IsInstance(PriceDto)
	priceBeforeFees?: PriceDto;

	@ApiProperty()
	@IsOptional()
	@IsInstance(PriceDto)
	shippingFee?: PriceDto;

	@ApiProperty()
	@IsOptional()
	@IsInstance(ShippingMethodDto)
	shippingMethod?: ShippingMethodDto;

	@ApiProperty()
	@IsOptional()
	@IsInstance(PaymentMethodDto)
	paymentMethod?: PaymentMethodDto;

	@ApiProperty()
	@IsOptional()
	@IsString()
	paymentFee?: string;

	constructor(
		currencyCode?: string,
		countryCode?: string,
		languageId?: string,
		id?: string,
		secret?: string,
		secondaryUserId?: string,
		secondaryUserName?: string,
		shopId?: string,
		createdAt?: string,
		modified?: string,
		completedDate?: string,
		completed?: boolean,
		customerUserId?: number,
		customerNumber?: string,
		customerEan?: string,
		customerRefId?: string,
		customerCompany?: string,
		customerTitle?: string,
		customerName?: string,
		customerFirstName?: string,
		customerSurname?: string,
		customerMiddleName?: string,
		customerHouseNumber?: string,
		customerInitials?: string,
		customerPrefix?: string,
		customerAddress?: string,
		customerAddress2?: string,
		customerZip?: string,
		customerCity?: string,
		customerCountry?: string,
		customerCountryCode?: string,
		customerRegion?: string,
		customerPhone?: string,
		customerEmail?: string,
		customerCell?: string,
		customerAccepted?: boolean,
		customerComment?: string,
		deliveryCompany?: string,
		deliveryName?: string,
		deliveryFirstName?: string,
		deliverySurname?: string,
		deliveryMiddleName?: string,
		deliveryTitle?: string,
		deliveryHouseNumber?: string,
		deliveryInitials?: string,
		deliveryPrefix?: string,
		deliveryAddress?: string,
		deliveryAddress2?: string,
		deliveryZip?: string,
		deliveryCity?: string,
		deliveryCountry?: string,
		deliveryCountryCode?: string,
		deliveryRegion?: string,
		deliveryPhone?: string,
		deliveryEmail?: string,
		deliveryCell?: string,
		orderLines?: OrderLineDto[],
		price?: PriceDto,
		totalPriceWithoutDiscountsFeesAndTaxes?: PriceBeforeDiscountDto,
		priceBeforeFees?: PriceDto,
		shippingFee?: PriceDto,
		shippingMethod?: ShippingMethodDto,
		paymentMethod?: PaymentMethodDto,
		paymentFee?: string,
	) {
		this.currencyCode = currencyCode;
		this.countryCode = countryCode;
		this.languageId = languageId;
		this.id = id;
		this.secret = secret;
		this.secondaryUserId = secondaryUserId;
		this.secondaryUserName = secondaryUserName;
		this.shopId = shopId;
		this.createdAt = createdAt;
		this.modified = modified;
		this.completedDate = completedDate;
		this.completed = completed;
		this.customerUserId = customerUserId;
		this.customerNumber = customerNumber;
		this.customerEan = customerEan;
		this.customerRefId = customerRefId;
		this.customerCompany = customerCompany;
		this.customerTitle = customerTitle;
		this.customerName = customerName;
		this.customerFirstName = customerFirstName;
		this.customerSurname = customerSurname;
		this.customerMiddleName = customerMiddleName;
		this.customerHouseNumber = customerHouseNumber;
		this.customerInitials = customerInitials;
		this.customerPrefix = customerPrefix;
		this.customerAddress = customerAddress;
		this.customerAddress2 = customerAddress2;
		this.customerZip = customerZip;
		this.customerCity = customerCity;
		this.customerCountry = customerCountry;
		this.customerCountryCode = customerCountryCode;
		this.customerRegion = customerRegion;
		this.customerPhone = customerPhone;
		this.customerEmail = customerEmail;
		this.customerCell = customerCell;
		this.customerAccepted = customerAccepted;
		this.customerComment = customerComment;
		this.deliveryCompany = deliveryCompany;
		this.deliveryName = deliveryName;
		this.deliveryFirstName = deliveryFirstName;
		this.deliverySurname = deliverySurname;
		this.deliveryMiddleName = deliveryMiddleName;
		this.deliveryTitle = deliveryTitle;
		this.deliveryHouseNumber = deliveryHouseNumber;
		this.deliveryInitials = deliveryInitials;
		this.deliveryPrefix = deliveryPrefix;
		this.deliveryAddress = deliveryAddress;
		this.deliveryAddress2 = deliveryAddress2;
		this.deliveryZip = deliveryZip;
		this.deliveryCity = deliveryCity;
		this.deliveryCountry = deliveryCountry;
		this.deliveryCountryCode = deliveryCountryCode;
		this.deliveryRegion = deliveryRegion;
		this.deliveryPhone = deliveryPhone;
		this.deliveryEmail = deliveryEmail;
		this.deliveryCell = deliveryCell;
		this.orderLines = orderLines;
		this.price = price;
		this.totalPriceWithoutDiscountsFeesAndTaxes =
			totalPriceWithoutDiscountsFeesAndTaxes;
		this.priceBeforeFees = priceBeforeFees;
		this.shippingFee = shippingFee;
		this.shippingMethod = shippingMethod;
		this.paymentMethod = paymentMethod;
		this.paymentFee = paymentFee;
	}
}
