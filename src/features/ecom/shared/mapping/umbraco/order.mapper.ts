import { OrderDto } from 'src/features/ecom/orders/dto/order.dto';
import { OrderLineDto } from 'src/features/ecom/orders/dto/orderline.dto';
import { mapUmbracoOrderline } from './orderline.mapper';
import { mapUmbracoPrice } from './price.mapper';
import { mapUmbracoPaymentMethod } from './paymentmethod.mapper';
import { mapUmbracoShippingMethod } from './shippingmethod.mapper';

export function mapUmbracoOrder(o: any): OrderDto {
	const mo = new OrderDto();

	if (o.currency?.code !== undefined) mo.currencyCode = o.currency.code;
	if (o.paymentInfo?.country?.code !== undefined)
		mo.countryCode = o.paymentInfo.country.code;
	if (o.languageIsoCode !== undefined) mo.languageId = o.languageIsoCode;
	if (o.id !== undefined) mo.id = o.id;
	if (o.orderNumber !== undefined) mo.secret = o.orderNumber;
	if (o.secondaryUserId !== undefined) mo.secondaryUserId = o.secondaryUserId;
	if (o.secondaryUserName !== undefined)
		mo.secondaryUserName = o.secondaryUserName;
	if (o.shopId !== undefined) mo.shopId = o.shopId;
	if (o.createDate !== undefined) mo.createdAt = o.createDate;
	if (o.updateDate !== undefined) mo.modified = o.updateDate;
	if (o.completedDate !== undefined) mo.completedDate = o.completedDate;
	if (o.isFinalized !== undefined) mo.completed = o.isFinalized;
	if (o.customerInfo?.customerReference !== undefined)
		mo.customerUserId = o.customerInfo.customerReference;
	if (o.customerNumber !== undefined) mo.customerNumber = o.customerNumber;
	if (o.customerEan !== undefined) mo.customerEan = o.customerEan;
	if (o.customerRefId !== undefined) mo.customerRefId = o.customerRefId;
	if (o.properties?.company !== undefined)
		mo.customerCompany = o.properties.company;
	if (o.customerTitle !== undefined) mo.customerTitle = o.customerTitle;
	if (o.properties?.firstName && o.properties?.lastName !== undefined)
		mo.customerName = `${o.properties.firstName} ${o.properties.lastName}`;
	if (o.properties?.firstName !== undefined)
		mo.customerFirstName = o.properties?.firstName;
	if (o.properties?.lastName !== undefined)
		mo.customerSurname = o.properties?.lastName;
	if (o.customerMiddleName !== undefined)
		mo.customerMiddleName = o.customerMiddleName;
	if (o.customerHouseNumber !== undefined)
		mo.customerHouseNumber = o.customerHouseNumber;
	if (o.customerInitials !== undefined)
		mo.customerInitials = o.customerInitials;
	if (o.customerPrefix !== undefined) mo.customerPrefix = o.customerPrefix;
	if (o.properties?.billingAddressLine1 !== undefined)
		mo.customerAddress = o.properties.billingAddressLine1;
	if (o.properties?.billingAddressLine2 !== undefined)
		mo.customerAddress2 = o.properties.billingAddressLine2;
	if (o.properties?.billingZipCode !== undefined)
		mo.customerZip = o.properties.billingZipCode;
	if (o.properties?.billingCity !== undefined)
		mo.customerCity = o.properties?.billingCity;
	if (o.customerCountry !== undefined) mo.customerCountry = o.customerCountry;
	if (o.shippingInfo?.country?.code !== undefined)
		mo.customerCountryCode = o.shippingInfo.country.code;
	if (o.customerRegion !== undefined) mo.customerRegion = o.customerRegion;
	if (o.properties?.telephone !== undefined)
		mo.customerPhone = o.properties.telephone;
	if (o.properties?.email !== undefined)
		mo.customerEmail = o.properties.email;
	if (o.customerCell !== undefined) mo.customerCell = o.customerCell;
	if (o.customerAccepted !== undefined)
		mo.customerAccepted = o.customerAccepted;
	if (o.properties?.comments !== undefined)
		mo.customerComment = o.properties.comments;
	if (o.properties?.company !== undefined)
		mo.deliveryCompany = o.properties.company;
	if (
		o.properties?.shippingFirstName &&
		o.properties?.shippingLastName !== undefined
	)
		mo.deliveryName = `${o.properties.shippingFirstName} ${o.properties.shippingLastName}`;
	if (o.properties?.shippingFirstName !== undefined)
		mo.deliveryFirstName = o.properties.shippingFirstName;
	if (o.properties?.shippingLastName !== undefined)
		mo.deliverySurname = o.properties.shippingLastName;
	if (o.deliveryMiddleName !== undefined)
		mo.deliveryMiddleName = o.deliveryMiddleName;
	if (o.deliveryTitle !== undefined) mo.deliveryTitle = o.deliveryTitle;
	if (o.deliveryHouseNumber !== undefined)
		mo.deliveryHouseNumber = o.deliveryHouseNumber;
	if (o.deliveryInitials !== undefined)
		mo.deliveryInitials = o.deliveryInitials;
	if (o.deliveryPrefix !== undefined) mo.deliveryPrefix = o.deliveryPrefix;
	if (o.properties?.shippingAddressLine1 !== undefined)
		mo.deliveryAddress = o.properties.shippingAddressLine1;
	if (o.properties?.shippingAddressLine2 !== undefined)
		mo.deliveryAddress2 = o.properties.shippingAddressLine2;
	if (o.properties?.shippingZipCode !== undefined)
		mo.deliveryZip = o.properties.shippingZipCode;
	if (o.properties?.shippingCity !== undefined)
		mo.deliveryCity = o.properties.shippingCity;
	if (o.shippingInfo?.country?.name !== undefined)
		mo.deliveryCountry = o.shippingInfo.country.name;
	if (o.shippingInfo?.country?.code !== undefined)
		mo.deliveryCountryCode = o.shippingInfo.country.code;
	if (o.deliveryRegion !== undefined) mo.deliveryRegion = o.deliveryRegion;
	if (o.properties?.telephone !== undefined)
		mo.deliveryPhone = o.properties.telephone;
	if (o.properties?.email !== undefined)
		mo.deliveryEmail = o.properties.email;
	if (o.deliveryCell !== undefined) mo.deliveryCell = o.deliveryCell;
	if (o.orderLines !== undefined)
		mo.orderLines = o.orderLines.map((ol: OrderLineDto) =>
			mapUmbracoOrderline(ol),
		);
	if (o.transactionInfo?.authorizedAmount !== undefined)
		mo.price = mapUmbracoPrice(o.transactionInfo.authorizedAmount);
	if (o.subtotalPrice !== undefined)
		mo.totalPriceWithoutDiscountsFeesAndTaxes = mapUmbracoPrice(
			o.subtotalPrice,
		);
	if (o.totalPrice !== undefined)
		mo.priceBeforeFees = mapUmbracoPrice(o.totalPrice);
	if (o.shippingInfo?.totalPrice?.value?.withTax !== null)
		mo.shippingFee = o.shippingInfo.totalPrice.value.withTax;
	if (o.shippingInfo !== undefined)
		mo.shippingMethod = mapUmbracoShippingMethod(o.shippingInfo);
	if (o.paymentInfo !== undefined)
		mo.paymentMethod = mapUmbracoPaymentMethod(o.paymentInfo);
	if (o.transactionInfo?.feeAmount?.value !== null)
		mo.paymentFee = o.transactionInfo.feeAmount.value;

	return mo;
}
