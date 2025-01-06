import { IsString, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponseDto extends ApiResponseDto {
	@ApiProperty()
	@IsString()
	@Expose()
	token: string;

	constructor(token: string) {
		super();
		this.token = token;
	}
}
