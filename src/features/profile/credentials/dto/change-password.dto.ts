import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';

export class ChangePasswordRequestDto {
	@ApiProperty()
	@IsString()
	password: string;

	@IsString()
	@IsOptional()
	userID?: string;
}

export class ChangePasswordResponseDto extends ApiResponseDto {}
