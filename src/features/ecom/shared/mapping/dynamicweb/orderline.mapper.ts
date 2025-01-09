import { OrderLineDto } from 'src/features/ecom/orders/dto/orderline.dto';
import { mapDynamicwebPrice } from './price.mapper';

export function mapDynamicwebOrderline(ol: any): OrderLineDto {
	const mol: OrderLineDto = {};

	if (ol.id !== undefined) mol.id = ol.id;
	if (ol.productId !== undefined) mol.productId = ol.productId;
	if (ol.productVariantId !== undefined)
		mol.productVariantId = ol.productVariantId;
	if (ol.productLanguageId !== undefined)
		mol.productLanguageId = ol.productLanguageId;
	if (ol.productName !== undefined) mol.productName = ol.productName;
	if (ol.productNumber !== undefined) mol.productNumber = ol.productNumber;
	if (ol.productVariantName !== undefined)
		mol.productVariantName = ol.productVariantName;
	if (ol.productImage !== undefined) mol.productImage = ol.productImage;
	if (ol.quantity !== undefined) mol.quantity = ol.quantity;
	if (ol.unitPrice !== undefined)
		mol.unitPrice = mapDynamicwebPrice(ol.unitPrice);
	if (ol.price !== undefined) mol.price = mapDynamicwebPrice(ol.price);

	return mol;
}
