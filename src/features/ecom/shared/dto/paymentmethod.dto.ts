import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class PaymentMethodDto {
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
	@IsString()
	code?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	termsCode?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	termsDescription?: string;
	
	constructor(
		id?: string,
		name?: string,
		description?: string,
		icon?: string,
		code?: string,
		termsCode?: string,
		termsDescription?: string
	) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.icon = icon;
		this.code = code;
		this.termsCode = termsCode;
		this.termsDescription = termsDescription;
	}
}