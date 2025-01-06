import { OrderDto } from 'src/features/ecom/orders/dto/order.dto';
import { mapShopifyOrderline } from './orderline.mapper';
import { mapShopifyPrice } from './price.mapper';

export function mapShopifyOrder(o: any, cInfo: any): OrderDto {
	const mo = new OrderDto();

	// ORDER INFO
	if (o.totalPrice?.currencyCode) mo.currencyCode = o.totalPrice.currencyCode;
	if (cInfo.defaultAddress?.countryCodeV2)
		mo.countryCode = cInfo.defaultAddress.countryCodeV2;
	if (o.id) mo.id = o.id;
	if (o.processedAt) mo.createdAt = o.processedAt;
	if (o.fulfillmentStatus) mo.completed = o.fulfillmentStatus === 'FULFILLED';

	// CUSTOMER INFO
	if (cInfo.id) mo.customerUserId = cInfo.id;
	if (cInfo.defaultAddress?.company)
		mo.customerCompany = cInfo.defaultAddress.company;
	if (cInfo.displayName) mo.customerName = cInfo.displayName;
	if (cInfo.firstName) mo.customerFirstName = cInfo.firstName;
	if (cInfo.lastName) mo.customerSurname = cInfo.lastName;
	if (cInfo.defaultAddress?.address1)
		mo.customerAddress = cInfo.defaultAddress.address1;
	if (cInfo.defaultAddress?.address2)
		mo.customerAddress2 = cInfo.defaultAddress.address2;
	if (cInfo.defaultAddress?.zip) mo.customerZip = cInfo.defaultAddress.zip;
	if (cInfo.defaultAddress?.city) mo.customerCity = cInfo.defaultAddress.city;
	if (cInfo.defaultAddress?.country)
		mo.customerCountry = cInfo.defaultAddress.country;
	if (cInfo.defaultAddress?.countryCodeV2)
		mo.customerCountryCode = cInfo.defaultAddress.countryCodeV2;
	if (cInfo.defaultAddress?.province)
		mo.customerRegion = cInfo.defaultAddress.province;
	if (cInfo.phone) mo.customerPhone = cInfo.phone;
	if (cInfo.email) mo.customerEmail = cInfo.email;

	// SHIPPING INFO
	if (o.shippingAddress?.company)
		mo.deliveryCompany = o.shippingAddress.company;
	if (o.shippingAddress?.name) mo.deliveryName = o.shippingAddress.name;
	if (o.shippingAddress?.firstName)
		mo.deliveryFirstName = o.shippingAddress.firstName;
	if (o.shippingAddress?.lastName)
		mo.deliverySurname = o.shippingAddress.lastName;
	if (o.shippingAddress?.address1)
		mo.deliveryAddress = o.shippingAddress.address1;
	if (o.shippingAddress?.address2)
		mo.deliveryAddress2 = o.shippingAddress.address2;
	if (o.shippingAddress?.zip) mo.deliveryZip = o.shippingAddress.zip;
	if (o.shippingAddress?.country)
		mo.deliveryCountry = o.shippingAddress.country;
	if (o.shippingAddress?.countryCodeV2)
		mo.deliveryCountryCode = o.shippingAddress.countryCodeV2;
	if (o.shippingAddress?.province)
		mo.deliveryRegion = o.shippingAddress.province;
	if (o.shippingAddress?.city) mo.deliveryCity = o.shippingAddress.city;
	if (o.shippingAddress?.phone) mo.deliveryPhone = o.shippingAddress.phone;

	// PRICING
	if (o.currentTotalPrice) mo.price = mapShopifyPrice(o.currentTotalPrice);
	if (o.subtotalPrice)
		mo.totalPriceWithoutDiscountsFeesAndTaxes = mapShopifyPrice(
			o.subtotalPrice,
		);
	if (o.currentSubtotalPrice)
		mo.priceBeforeFees = mapShopifyPrice(o.currentSubtotalPrice);
	if (o.totalShippingPrice)
		mo.shippingFee = mapShopifyPrice(o.totalShippingPrice);

	// ORDERLINES
	if (o.lineItems)
		mo.orderLines = o.lineItems.edges?.map((ol: any) =>
			mapShopifyOrderline(ol),
		);

	return mo;
}
