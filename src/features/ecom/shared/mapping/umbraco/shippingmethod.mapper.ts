import { ShippingMethodDto } from '../../dto/shippingmethod.dto';

export function mapUmbracoShippingMethod(
	shippingMethod: any,
): ShippingMethodDto {
	const msp: ShippingMethodDto = {};

	if (shippingMethod?.shippingMethod?.id !== undefined)
		msp.id = shippingMethod.shippingMethod.id;
	if (shippingMethod?.shippingMethod?.alias !== undefined)
		msp.name = shippingMethod.shippingMethod.alias;
	if (shippingMethod.description !== undefined)
		msp.description = shippingMethod.description;
	if (shippingMethod.icon !== undefined) msp.icon = shippingMethod.icon;
	if (shippingMethod.priceOverMaxWeight !== undefined)
		msp.priceOverMaxWeight = shippingMethod.priceOverMaxWeight;
	if (shippingMethod.freeFeeAmount !== undefined)
		msp.freeFeeAmount = shippingMethod.freeFeeAmount;
	if (shippingMethod.code !== undefined) msp.code = shippingMethod.code;
	if (shippingMethod.agentCode !== undefined)
		msp.agentCode = shippingMethod.agentCode;
	if (shippingMethod.agentName !== undefined)
		msp.agentName = shippingMethod.agentName;
	if (shippingMethod.agentServiceCode !== undefined)
		msp.agentServiceCode = shippingMethod.agentServiceCode;
	if (shippingMethod.agentServiceDescription !== undefined)
		msp.agentServiceDescription = shippingMethod.agentServiceDescription;

	return msp;
}
