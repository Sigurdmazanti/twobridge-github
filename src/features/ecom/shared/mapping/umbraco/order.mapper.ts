import { OrderDto } from 'src/features/ecom/orders/dto/order.dto';
import { OrderLineDto } from 'src/features/ecom/orders/dto/orderline.dto';
import { mapUmbracoOrderline } from './orderline.mapper';
import { mapUmbracoPrice } from './price.mapper';
import { mapUmbracoPaymentMethod } from './paymentmethod.mapper';
import { mapUmbracoShippingMethod } from './shippingmethod.mapper';

export function mapUmbracoOrder(o: any): OrderDto {
	const mo = new OrderDto();

	if (o.currency?.code) mo.currencyCode = o.currency.code;
	if (o.paymentInfo?.country?.code)
		mo.countryCode = o.paymentInfo.country.code;
	if (o.languageIsoCode) mo.languageId = o.languageIsoCode;
	if (o.id) mo.id = o.id;
	if (o.orderNumber) mo.secret = o.orderNumber;
	if (o.secondaryUserId) mo.secondaryUserId = o.secondaryUserId;
	if (o.secondaryUserName) mo.secondaryUserName = o.secondaryUserName;
	if (o.shopId) mo.shopId = o.shopId;
	if (o.createDate) mo.createdAt = o.createDate;
	if (o.updateDate) mo.modified = o.updateDate;
	if (o.completedDate) mo.completedDate = o.completedDate;
	if (o.isFinalized) mo.completed = o.isFinalized;
	if (o.customerInfo?.customerReference)
		mo.customerUserId = o.customerInfo.customerReference;
	if (o.customerNumber) mo.customerNumber = o.customerNumber;
	if (o.customerEan) mo.customerEan = o.customerEan;
	if (o.customerRefId) mo.customerRefId = o.customerRefId;
	if (o.properties?.company) mo.customerCompany = o.properties.company;
	if (o.customerTitle) mo.customerTitle = o.customerTitle;
	if (o.properties?.firstName && o.properties?.lastName)
		mo.customerName = `${o.properties.firstName} ${o.properties.lastName}`;
	if (o.properties?.firstName) mo.customerFirstName = o.properties?.firstName;
	if (o.properties?.lastName) mo.customerSurname = o.properties?.lastName;
	if (o.customerMiddleName) mo.customerMiddleName = o.customerMiddleName;
	if (o.customerHouseNumber) mo.customerHouseNumber = o.customerHouseNumber;
	if (o.customerInitials) mo.customerInitials = o.customerInitials;
	if (o.customerPrefix) mo.customerPrefix = o.customerPrefix;
	if (o.properties?.billingAddressLine1)
		mo.customerAddress = o.properties.billingAddressLine1;
	if (o.properties?.billingAddressLine2)
		mo.customerAddress2 = o.properties.billingAddressLine2;
	if (o.properties?.billingZipCode)
		mo.customerZip = o.properties.billingZipCode;
	if (o.properties?.billingCity) mo.customerCity = o.properties?.billingCity;
	if (o.customerCountry) mo.customerCountry = o.customerCountry;
	if (o.shippingInfo?.country?.code)
		mo.customerCountryCode = o.shippingInfo.country.code;
	if (o.customerRegion) mo.customerRegion = o.customerRegion;
	if (o.properties?.telephone) mo.customerPhone = o.properties.telephone;
	if (o.properties?.email) mo.customerEmail = o.properties.email;
	if (o.customerCell) mo.customerCell = o.customerCell;
	if (o.customerAccepted) mo.customerAccepted = o.customerAccepted;
	if (o.properties?.comments) mo.customerComment = o.properties.comments;
	if (o.properties?.company) mo.deliveryCompany = o.properties.company;
	if (o.properties?.shippingFirstName && o.properties?.shippingLastName)
		mo.deliveryName = `${o.properties.shippingFirstName} ${o.properties.shippingLastName}`;
	if (o.properties?.shippingFirstName)
		mo.deliveryFirstName = o.properties.shippingFirstName;
	if (o.properties?.shippingLastName)
		mo.deliverySurname = o.properties.shippingLastName;
	if (o.deliveryMiddleName) mo.deliveryMiddleName = o.deliveryMiddleName;
	if (o.deliveryTitle) mo.deliveryTitle = o.deliveryTitle;
	if (o.deliveryHouseNumber) mo.deliveryHouseNumber = o.deliveryHouseNumber;
	if (o.deliveryInitials) mo.deliveryInitials = o.deliveryInitials;
	if (o.deliveryPrefix) mo.deliveryPrefix = o.deliveryPrefix;
	if (o.properties?.shippingAddressLine1)
		mo.deliveryAddress = o.properties.shippingAddressLine1;
	if (o.properties?.shippingAddressLine2)
		mo.deliveryAddress2 = o.properties.shippingAddressLine2;
	if (o.properties?.shippingZipCode)
		mo.deliveryZip = o.properties.shippingZipCode;
	if (o.properties?.shippingCity) mo.deliveryCity = o.properties.shippingCity;
	if (o.shippingInfo?.country?.name)
		mo.deliveryCountry = o.shippingInfo.country.name;
	if (o.shippingInfo?.country?.code)
		mo.deliveryCountryCode = o.shippingInfo.country.code;
	if (o.deliveryRegion) mo.deliveryRegion = o.deliveryRegion;
	if (o.properties?.telephone) mo.deliveryPhone = o.properties.telephone;
	if (o.properties?.email) mo.deliveryEmail = o.properties.email;
	if (o.deliveryCell) mo.deliveryCell = o.deliveryCell;
	if (o.orderLines)
		mo.orderLines = o.orderLines.map((ol: OrderLineDto) =>
			mapUmbracoOrderline(ol),
		);
	if (o.transactionInfo?.authorizedAmount)
		mo.price = mapUmbracoPrice(o.transactionInfo.authorizedAmount);
	if (o.subtotalPrice)
		mo.totalPriceWithoutDiscountsFeesAndTaxes = mapUmbracoPrice(
			o.subtotalPrice,
		);
	if (o.totalPrice) mo.priceBeforeFees = mapUmbracoPrice(o.totalPrice);
	if (o.shippingInfo?.totalPrice?.value?.withTax !== null)
		mo.shippingFee = o.shippingInfo.totalPrice.value.withTax;
	if (o.shippingInfo)
		mo.shippingMethod = mapUmbracoShippingMethod(o.shippingInfo);
	if (o.paymentInfo)
		mo.paymentMethod = mapUmbracoPaymentMethod(o.paymentInfo);
	if (o.transactionInfo?.feeAmount?.value !== null)
		mo.paymentFee = o.transactionInfo.feeAmount.value;

	return mo;
}
