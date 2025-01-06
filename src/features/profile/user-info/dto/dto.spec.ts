import { BadRequestException } from '@nestjs/common';
import { testDtoValidation } from 'src/common/helpers/test-helper';
import { GetUserInfoResponseDto } from './get-user-info-response.dto';
import { UpdateUserInfoDto } from './update-user-info.dto';

describe('User info DTO validation tests', () => {
	it('should validate GetUserInfoResponseDto with invalid data types', async () => {
		await expect(testDtoValidation(GetUserInfoResponseDto)).rejects.toThrow(
			BadRequestException,
		);
	});

	it('should validate UpdateUserInfoDto with invalid data types', async () => {
		await expect(testDtoValidation(UpdateUserInfoDto)).rejects.toThrow(
			BadRequestException,
		);
	});
});
