import { Expose } from 'class-transformer';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class ApiResponseDto<T = any> {
	@IsInt()
	@IsOptional()
	@Expose()
	statusCode?: number;

	@IsString()
	@IsOptional()
	@Expose()
	message?: string;

	private readonly _dummy?: T;

	constructor(message?: string, statusCode?: number) {
		this.message = message;
		this.statusCode = statusCode;
	}
}
