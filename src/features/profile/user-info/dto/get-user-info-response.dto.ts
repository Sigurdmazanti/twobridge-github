import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsEmail } from 'class-validator';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';

export class GetUserInfoResponseDto extends ApiResponseDto {
	@ApiProperty()
	@IsOptional()
	@IsInt()
	id?: number;

	@ApiProperty()
	@IsOptional()
	@IsString()
	userName?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	name?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	firstName?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	middleName?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	lastName?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	customerNumber?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	address?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	address2?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	houseNumber?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	city?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	zip?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	country?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	phone?: string;

	@ApiProperty()
	@IsOptional()
	@IsEmail()
	email?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	shopId?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	countryCode?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	currency?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	externalId?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	uniqueId?: string;

	constructor(
		id?: number,
		userName?: string,
		name?: string,
		firstName?: string,
		middleName?: string,
		lastName?: string,
		customerNumber?: string,
		address?: string,
		address2?: string,
		houseNumber?: string,
		city?: string,
		zip?: string,
		country?: string,
		phone?: string,
		email?: string,
		shopId?: string,
		countryCode?: string,
		currency?: string,
		externalId?: string,
		uniqueId?: string,
	) {
		super();
		this.id = id;
		this.userName = userName;
		this.name = name;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.customerNumber = customerNumber;
		this.address = address;
		this.address2 = address2;
		this.houseNumber = houseNumber;
		this.city = city;
		this.zip = zip;
		this.country = country;
		this.phone = phone;
		this.email = email;
		this.shopId = shopId;
		this.countryCode = countryCode;
		this.currency = currency;
		this.externalId = externalId;
		this.uniqueId = uniqueId;
	}
}
