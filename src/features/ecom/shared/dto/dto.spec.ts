import { BadRequestException } from '@nestjs/common';
import { testDtoValidation } from 'src/common/helpers/test-helper';
import { PaymentMethodDto } from './paymentmethod.dto';
import { PriceBeforeDiscountDto, PriceDto } from './price.dto';
import { ShippingMethodDto } from './shippingmethod.dto';

describe('Ecom DTO validation tests', () => {
	it('should validate PaymentMethodDto with invalid data types', async () => {
		await expect(testDtoValidation(PaymentMethodDto)).rejects.toThrow(
			BadRequestException,
		);
	});

	it('should validate PriceDto with invalid data types', async () => {
		await expect(testDtoValidation(PriceDto)).rejects.toThrow(
			BadRequestException,
		);
	});

	it('should validate PriceBeforeDiscountDto with invalid data types', async () => {
		await expect(testDtoValidation(PriceBeforeDiscountDto)).rejects.toThrow(
			BadRequestException,
		);
	});

	it('should validate ShippingMethodDto with invalid data types', async () => {
		await expect(testDtoValidation(ShippingMethodDto)).rejects.toThrow(
			BadRequestException,
		);
	});
});
