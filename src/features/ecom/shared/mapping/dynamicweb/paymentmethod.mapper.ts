import { PaymentMethodDto } from '../../dto/paymentmethod.dto';

export function mapDynamicwebPaymentMethod(
	paymentMethod: any,
): PaymentMethodDto {
	const mpm: PaymentMethodDto = {};

	if (paymentMethod.id !== undefined) mpm.id = paymentMethod.id;
	if (paymentMethod.name !== undefined) mpm.name = paymentMethod.name;
	if (paymentMethod.description !== undefined)
		mpm.description = paymentMethod.description;
	if (paymentMethod.icon !== undefined) mpm.icon = paymentMethod.icon;
	if (paymentMethod.code !== undefined) mpm.code = paymentMethod.code;
	if (paymentMethod.termsCode !== undefined)
		mpm.termsCode = paymentMethod.termsCode;
	if (paymentMethod.termsDescription !== undefined)
		mpm.termsDescription = paymentMethod.termsDescription;

	return mpm;
}
