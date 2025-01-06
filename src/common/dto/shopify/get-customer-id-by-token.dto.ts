import { IsString } from 'class-validator';
import { ApiResponseDto } from '../api-response.dto';

export class GetShopifyCustomerIdByTokenResponse extends ApiResponseDto {
	@IsString()
	id: string;

	constructor(id: string) {
		super();
		this.id = id;
	}
}
