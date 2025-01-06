import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, IsOptional } from 'class-validator';

export class PriceDto {
	@ApiProperty()
	@IsOptional()
	@IsBoolean()
	showPricesWithVat?: boolean;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	price?: number;

	@ApiProperty()
	@IsOptional()
	@IsString()
	priceFormatted?: string;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	priceWithoutVat?: number;

	@ApiProperty()
	@IsOptional()
	@IsString()
	priceWithoutVatFormatted?: string;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	priceWithVat?: number;

	@ApiProperty()
	@IsOptional()
	@IsString()
	priceWithVatFormatted?: string;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	vat?: number;

	@ApiProperty()
	@IsOptional()
	@IsString()
	vatFormatted?: string;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	vatPercent?: number;

	@ApiProperty()
	@IsOptional()
	@IsString()
	vatPercentFormatted?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	currencyCode?: string;

	constructor(
		showPricesWithVat?: boolean,
		price?: number,
		priceFormatted?: string,
		priceWithoutVat?: number,
		priceWithoutVatFormatted?: string,
		priceWithVat?: number,
		priceWithVatFormatted?: string,
		vat?: number,
		vatFormatted?: string,
		vatPercent?: number,
		vatPercentFormatted?: string,
		currencyCode?: string
	) {
		this.showPricesWithVat = showPricesWithVat;
		this.price = price;
		this.priceFormatted = priceFormatted;
		this.priceWithoutVat = priceWithoutVat;
		this.priceWithoutVatFormatted = priceWithoutVatFormatted;
		this.priceWithVat = priceWithVat;
		this.priceWithVatFormatted = priceWithVatFormatted;
		this.vat = vat;
		this.vatFormatted = vatFormatted;
		this.vatPercent = vatPercent;
		this.vatPercentFormatted = vatPercentFormatted;
		this.currencyCode = currencyCode;
	}
}

export class PriceBeforeDiscountDto extends PriceDto {
	constructor(
		showPricesWithVat?: boolean,
		price?: number,
		priceFormatted?: string,
		priceWithoutVat?: number,
		priceWithoutVatFormatted?: string,
		priceWithVat?: number,
		priceWithVatFormatted?: string,
		vat?: number,
		vatFormatted?: string,
		vatPercent?: number,
		vatPercentFormatted?: string,
		currencyCode?: string
	) {
		super(
		showPricesWithVat,
		price,
		priceFormatted,
		priceWithoutVat,
		priceWithoutVatFormatted,
		priceWithVat,
		priceWithVatFormatted,
		vat,
		vatFormatted,
		vatPercent,
		vatPercentFormatted,
		currencyCode
		);
	}
}