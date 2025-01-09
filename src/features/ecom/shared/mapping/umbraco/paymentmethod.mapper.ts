import { PaymentMethodDto } from '../../dto/paymentmethod.dto';

export function mapUmbracoPaymentMethod(paymentMethod: any): PaymentMethodDto {
	const mpm: PaymentMethodDto = {};

	if (paymentMethod?.paymentMethod?.id !== undefined)
		mpm.id = paymentMethod.paymentMethod.id;
	if (paymentMethod?.paymentMethod?.alias !== undefined)
		mpm.name = paymentMethod.paymentMethod.alias;
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
