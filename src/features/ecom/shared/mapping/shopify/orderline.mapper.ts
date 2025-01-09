import { OrderLineDto } from 'src/features/ecom/orders/dto/orderline.dto';
import { mapShopifyPrice, mapShopifyUnitPrice } from './price.mapper';

export function mapShopifyOrderline(orderLine: any): OrderLineDto {
	const ol = orderLine.node;

	const mol: OrderLineDto = {};
	if (ol.id !== undefined) mol.id = ol.id;
	if (ol.variant?.product?.id !== undefined) mol.productId = ol.variant.product.id;
	if (ol.variant?.id !== undefined) mol.productVariantId = ol.variant.id;
	if (ol.variant?.product?.title !== undefined) mol.productName = ol.variant.product.title;
	if (ol.variant?.sku !== undefined) mol.productNumber = ol.variant.sku;
	if (ol.variant?.title !== undefined) mol.productVariantName = ol.variant.title;
	if (ol.variant?.image?.url !== undefined) mol.productImage = ol.variant.image.url;
	if (ol.quantity !== undefined) mol.quantity = ol.quantity;

	if (ol.variant?.unitPrice !== undefined)
		mol.unitPrice = mapShopifyUnitPrice(ol.variant?.unitPrice);
	if (ol.discountedTotalPrice !== undefined && ol.originalTotalPrice !== undefined)
		mol.price = mapShopifyPrice(
			ol.discountedTotalPrice,
			ol.originalTotalPrice,
		);

	return mol;
}
