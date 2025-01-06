import { PaymentMethodDto } from '../../dto/paymentmethod.dto';

export function mapDynamicwebPaymentMethod(
	paymentMethod: any,
): PaymentMethodDto {
	const mpm: PaymentMethodDto = {};

	if (paymentMethod.id) mpm.id = paymentMethod.id;
	if (paymentMethod.name) mpm.name = paymentMethod.name;
	if (paymentMethod.description) mpm.description = paymentMethod.description;
	if (paymentMethod.icon) mpm.icon = paymentMethod.icon;
	if (paymentMethod.code) mpm.code = paymentMethod.code;
	if (paymentMethod.termsCode) mpm.termsCode = paymentMethod.termsCode;
	if (paymentMethod.termsDescription)
		mpm.termsDescription = paymentMethod.termsDescription;

	return mpm;
}
