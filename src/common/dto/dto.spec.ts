import { BadRequestException } from '@nestjs/common';
import { AuthHeadersDto } from './headers-auth.dto';
import { ApiResponseDto } from './api-response.dto';
import { ApiErrorResponseDto } from './api-error-response.dto';
import { testDtoValidation } from '../helpers/test-helper';
import { GetShopifyCustomerIdByTokenResponse } from './shopify/get-customer-id-by-token.dto';

describe('Global DTO validation tests', () => {
	it('should validate AuthHeadersDto with invalid data types', async () => {
		await expect(testDtoValidation(AuthHeadersDto)).rejects.toThrow(
			BadRequestException,
		);
	});

	it('should validate ApiResponseDto with invalid data types', async () => {
		await expect(testDtoValidation(ApiResponseDto)).rejects.toThrow(
			BadRequestException,
		);
	});

	it('should validate ApiErrorResponseDto with invalid data types', async () => {
		await expect(testDtoValidation(ApiErrorResponseDto)).rejects.toThrow(
			BadRequestException,
		);
	});

	it('should validate GetShopifyCustomerIdByTokenResponse with invalid data types', async () => {
		await expect(
			testDtoValidation(GetShopifyCustomerIdByTokenResponse),
		).rejects.toThrow(BadRequestException);
	});
});
