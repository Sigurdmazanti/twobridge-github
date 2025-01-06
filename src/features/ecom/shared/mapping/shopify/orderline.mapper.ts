import { OrderLineDto } from 'src/features/ecom/orders/dto/orderline.dto';
import { mapShopifyPrice, mapShopifyUnitPrice } from './price.mapper';

export function mapShopifyOrderline(orderLine: any): OrderLineDto {
	const ol = orderLine.node;

	const mol: OrderLineDto = {};
	if (ol.id) mol.id = ol.id;
	if (ol.variant?.product?.id) mol.productId = ol.variant.product.id;
	if (ol.variant?.id) mol.productVariantId = ol.variant.id;
	if (ol.variant?.product?.title) mol.productName = ol.variant.product.title;
	if (ol.variant?.sku) mol.productNumber = ol.variant.sku;
	if (ol.variant?.title) mol.productVariantName = ol.variant.title;
	if (ol.variant?.image?.url) mol.productImage = ol.variant.image.url;
	if (ol.quantity) mol.quantity = ol.quantity;

	if (ol.variant?.unitPrice)
		mol.unitPrice = mapShopifyUnitPrice(ol.variant?.unitPrice);
	if (ol.discountedTotalPrice && ol.originalTotalPrice)
		mol.price = mapShopifyPrice(
			ol.discountedTotalPrice,
			ol.originalTotalPrice,
		);

	return mol;
}
