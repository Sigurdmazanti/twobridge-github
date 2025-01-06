import { Expose } from 'class-transformer';
import { IsString, IsInt } from 'class-validator';

export class ApiErrorResponseDto<T = any> {
	@IsInt()
	@Expose()
	statusCode: number = 500;

	@IsString()
	@Expose()
	message: string = 'There was an error handling the request.';

	[key: string]: any;

	constructor(
		statusCode: number,
		message?: string,
		additionalProps?: { [key: string]: any },
	) {
		this.statusCode = statusCode;
		this.message = message;

		if (additionalProps) {
			Object.assign(this, additionalProps);
		}
	}
}
