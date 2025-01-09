import { OrderLineDto } from 'src/features/ecom/orders/dto/orderline.dto';
import { mapUmbracoPrice } from './price.mapper';

export function mapUmbracoOrderline(ol: any): OrderLineDto {
	const mol: OrderLineDto = {};

	if (ol.id !== undefined) mol.id = ol.id;
	if (ol.productReference !== undefined) mol.productId = ol.productReference;
	if (ol.productVariantReference !== undefined)
		mol.productVariantId = ol.productVariantReference;
	if (ol.productLanguageId !== undefined) mol.productLanguageId = ol.productLanguageId;
	if (ol.name !== undefined) mol.productName = ol.name;
	if (ol.sku !== undefined) mol.productNumber = ol.sku;
	if (ol.productVariantName !== undefined) mol.productVariantName = ol.productVariantName;
	if (ol.productImage !== undefined) mol.productImage = ol.productImage;
	if (ol.quantity !== undefined) mol.quantity = ol.quantity;
	if (ol.unitPrice !== undefined) mol.unitPrice = mapUmbracoPrice(ol.unitPrice);
	if (ol.totalPrice !== undefined) mol.price = mapUmbracoPrice(ol.totalPrice);

	return mol;
}
