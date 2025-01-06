import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class ShippingMethodDto {
	@ApiProperty()
	@IsOptional()
	@IsString()
	id?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	name?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	icon?: string;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	priceOverMaxWeight?: number;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	freeFeeAmount?: number;

	@ApiProperty()
	@IsOptional()
	@IsString()
	code?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	agentCode?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	agentName?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	agentServiceCode?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	agentServiceDescription?: string;

	constructor(
		id?: string,
		name?: string,
		description?: string,
		icon?: string,
		priceOverMaxWeight?: number,
		freeFeeAmount?: number,
		code?: string,
		agentCode?: string,
		agentName?: string,
		agentServiceCode?: string,
		agentServiceDescription?: string
	) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.icon = icon;
		this.priceOverMaxWeight = priceOverMaxWeight;
		this.freeFeeAmount = freeFeeAmount;
		this.code = code;
		this.agentCode = agentCode;
		this.agentName = agentName;
		this.agentServiceCode = agentServiceCode;
		this.agentServiceDescription = agentServiceDescription;
	}
}
