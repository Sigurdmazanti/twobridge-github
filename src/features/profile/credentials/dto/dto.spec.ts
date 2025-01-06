import { BadRequestException } from '@nestjs/common';
import { testDtoValidation } from 'src/common/helpers/test-helper';
import {
	ChangePasswordRequestDto,
	ChangePasswordResponseDto,
} from './change-password.dto';

describe('Credentials DTO validation tests', () => {
	it('should validate ChangePasswordRequestDto with invalid data types', async () => {
		await expect(
			testDtoValidation(ChangePasswordRequestDto),
		).rejects.toThrow(BadRequestException);
	});

	it('should validate ChangePasswordResponseDto with invalid data types', async () => {
		await expect(
			testDtoValidation(ChangePasswordResponseDto),
		).rejects.toThrow(BadRequestException);
	});
});
