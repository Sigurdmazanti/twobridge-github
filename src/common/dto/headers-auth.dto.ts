import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class AuthHeadersDto {
	@IsString()
	@IsNotEmpty()
	@Expose()
	authorization: string;

	constructor(authorization: string) {
		this.authorization = authorization;
	}
}
