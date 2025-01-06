import { PaymentMethodDto } from '../../dto/paymentmethod.dto';

export function mapUmbracoPaymentMethod(
    paymentMethod: any,
): PaymentMethodDto {
    const mpm: PaymentMethodDto = {};

    if (paymentMethod?.paymentMethod?.id) mpm.id = paymentMethod.paymentMethod.id;
    if (paymentMethod?.paymentMethod?.alias) mpm.name = paymentMethod.paymentMethod.alias;
    if (paymentMethod.description) mpm.description = paymentMethod.description;
    if (paymentMethod.icon) mpm.icon = paymentMethod.icon;
    if (paymentMethod.code) mpm.code = paymentMethod.code;
    if (paymentMethod.termsCode) mpm.termsCode = paymentMethod.termsCode;
    if (paymentMethod.termsDescription) mpm.termsDescription = paymentMethod.termsDescription;

    return mpm;
}