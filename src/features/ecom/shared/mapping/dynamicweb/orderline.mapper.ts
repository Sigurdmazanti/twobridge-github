import { OrderLineDto } from 'src/features/ecom/orders/dto/orderline.dto';
import { mapDynamicwebPrice } from './price.mapper';

export function mapDynamicwebOrderline(ol: any): OrderLineDto {
	const mol: OrderLineDto = {};

	if (ol.id) mol.id = ol.id;
	if (ol.productId) mol.productId = ol.productId;
	if (ol.productVariantId) mol.productVariantId = ol.productVariantId;
	if (ol.productLanguageId) mol.productLanguageId = ol.productLanguageId;
	if (ol.productName) mol.productName = ol.productName;
	if (ol.productNumber) mol.productNumber = ol.productNumber;
	if (ol.productVariantName) mol.productVariantName = ol.productVariantName;
	if (ol.productImage) mol.productImage = ol.productImage;
	if (ol.quantity) mol.quantity = ol.quantity;
	if (ol.unitPrice) mol.unitPrice = mapDynamicwebPrice(ol.unitPrice);
	if (ol.price) mol.price = mapDynamicwebPrice(ol.price);

	return mol;
}
