import { OrderDto } from 'src/features/ecom/orders/dto/order.dto';
import { mapShopifyOrderline } from './orderline.mapper';
import { mapShopifyPrice } from './price.mapper';

export function mapShopifyOrder(o: any, cInfo: any): OrderDto {
	const mo = new OrderDto();

	// ORDER INFO
	if (o.totalPrice?.currencyCode !== undefined)
		mo.currencyCode = o.totalPrice.currencyCode;
	if (cInfo.defaultAddress?.countryCodeV2 !== undefined)
		mo.countryCode = cInfo.defaultAddress.countryCodeV2;
	if (o.id !== undefined) mo.id = o.id;
	if (o.processedAt !== undefined) mo.createdAt = o.processedAt;
	if (o.fulfillmentStatus !== undefined)
		mo.completed = o.fulfillmentStatus === 'FULFILLED';

	// CUSTOMER INFO
	if (cInfo.id !== undefined) mo.customerUserId = cInfo.id;
	if (cInfo.defaultAddress?.company !== undefined)
		mo.customerCompany = cInfo.defaultAddress.company;
	if (cInfo.displayName !== undefined) mo.customerName = cInfo.displayName;
	if (cInfo.firstName !== undefined) mo.customerFirstName = cInfo.firstName;
	if (cInfo.lastName !== undefined) mo.customerSurname = cInfo.lastName;
	if (cInfo.defaultAddress?.address1 !== undefined)
		mo.customerAddress = cInfo.defaultAddress.address1;
	if (cInfo.defaultAddress?.address2 !== undefined)
		mo.customerAddress2 = cInfo.defaultAddress.address2;
	if (cInfo.defaultAddress?.zip !== undefined)
		mo.customerZip = cInfo.defaultAddress.zip;
	if (cInfo.defaultAddress?.city !== undefined)
		mo.customerCity = cInfo.defaultAddress.city;
	if (cInfo.defaultAddress?.country !== undefined)
		mo.customerCountry = cInfo.defaultAddress.country;
	if (cInfo.defaultAddress?.countryCodeV2 !== undefined)
		mo.customerCountryCode = cInfo.defaultAddress.countryCodeV2;
	if (cInfo.defaultAddress?.province !== undefined)
		mo.customerRegion = cInfo.defaultAddress.province;
	if (cInfo.phone !== undefined) mo.customerPhone = cInfo.phone;
	if (cInfo.email !== undefined) mo.customerEmail = cInfo.email;

	// SHIPPING INFO
	if (o.shippingAddress?.company !== undefined)
		mo.deliveryCompany = o.shippingAddress.company;
	if (o.shippingAddress?.name !== undefined)
		mo.deliveryName = o.shippingAddress.name;
	if (o.shippingAddress?.firstName !== undefined)
		mo.deliveryFirstName = o.shippingAddress.firstName;
	if (o.shippingAddress?.lastName !== undefined)
		mo.deliverySurname = o.shippingAddress.lastName;
	if (o.shippingAddress?.address1 !== undefined)
		mo.deliveryAddress = o.shippingAddress.address1;
	if (o.shippingAddress?.address2 !== undefined)
		mo.deliveryAddress2 = o.shippingAddress.address2;
	if (o.shippingAddress?.zip !== undefined)
		mo.deliveryZip = o.shippingAddress.zip;
	if (o.shippingAddress?.country !== undefined)
		mo.deliveryCountry = o.shippingAddress.country;
	if (o.shippingAddress?.countryCodeV2 !== undefined)
		mo.deliveryCountryCode = o.shippingAddress.countryCodeV2;
	if (o.shippingAddress?.province !== undefined)
		mo.deliveryRegion = o.shippingAddress.province;
	if (o.shippingAddress?.city !== undefined)
		mo.deliveryCity = o.shippingAddress.city;
	if (o.shippingAddress?.phone !== undefined)
		mo.deliveryPhone = o.shippingAddress.phone;

	// PRICING
	if (o.currentTotalPrice !== undefined)
		mo.price = mapShopifyPrice(o.currentTotalPrice);
	if (o.subtotalPrice !== undefined)
		mo.totalPriceWithoutDiscountsFeesAndTaxes = mapShopifyPrice(
			o.subtotalPrice,
		);
	if (o.currentSubtotalPrice !== undefined)
		mo.priceBeforeFees = mapShopifyPrice(o.currentSubtotalPrice);
	if (o.totalShippingPrice !== undefined)
		mo.shippingFee = mapShopifyPrice(o.totalShippingPrice);

	// ORDERLINES
	if (o.lineItems !== undefined)
		mo.orderLines = o.lineItems.edges?.map((ol: any) =>
			mapShopifyOrderline(ol),
		);

	return mo;
}
