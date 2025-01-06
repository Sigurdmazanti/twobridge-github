import { ShippingMethodDto } from '../../dto/shippingmethod.dto';

export function mapUmbracoShippingMethod(
    shippingMethod: any,
): ShippingMethodDto {
    const msp: ShippingMethodDto = {};

    if (shippingMethod?.shippingMethod?.id) msp.id = shippingMethod.shippingMethod.id;
    if (shippingMethod?.shippingMethod?.alias) msp.name = shippingMethod.shippingMethod.alias;
    if (shippingMethod.description) msp.description = shippingMethod.description;
    if (shippingMethod.icon) msp.icon = shippingMethod.icon;
    if (shippingMethod.priceOverMaxWeight) msp.priceOverMaxWeight = shippingMethod.priceOverMaxWeight;
    if (shippingMethod.freeFeeAmount) msp.freeFeeAmount = shippingMethod.freeFeeAmount;
    if (shippingMethod.code) msp.code = shippingMethod.code;
    if (shippingMethod.agentCode) msp.agentCode = shippingMethod.agentCode;
    if (shippingMethod.agentName) msp.agentName = shippingMethod.agentName;
    if (shippingMethod.agentServiceCode) msp.agentServiceCode = shippingMethod.agentServiceCode;
    if (shippingMethod.agentServiceDescription) msp.agentServiceDescription = shippingMethod.agentServiceDescription;

    return msp;
}
