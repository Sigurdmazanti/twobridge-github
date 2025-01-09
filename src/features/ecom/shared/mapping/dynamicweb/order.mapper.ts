import { OrderDto } from 'src/features/ecom/orders/dto/order.dto';
import { mapDynamicwebOrderline } from './orderline.mapper';
import { OrderLineDto } from 'src/features/ecom/orders/dto/orderline.dto';
import { mapDynamicwebPrice } from './price.mapper';
import { mapDynamicwebPaymentMethod } from './paymentmethod.mapper';
import { mapDynamicwebShippingMethod } from './shippingmethod.mapper';

export function mapDynamicwebOrder(o: any): OrderDto {
	const mo = new OrderDto();

	if (o.currencyCode !== undefined) mo.currencyCode = o.currencyCode;
	if (o.countryCode !== undefined) mo.countryCode = o.countryCode;
	if (o.languageId !== undefined) mo.languageId = o.languageId;
	if (o.id !== undefined) mo.id = o.id;
	if (o.secret !== undefined) mo.secret = o.secret;
	if (o.secondaryUserId !== undefined) mo.secondaryUserId = o.secondaryUserId;
	if (o.secondaryUserName !== undefined)
		mo.secondaryUserName = o.secondaryUserName;
	if (o.shopId !== undefined) mo.shopId = o.shopId;
	if (o.createdAt !== undefined) mo.createdAt = o.createdAt;
	if (o.modified !== undefined) mo.modified = o.modified;
	if (o.completedDate !== undefined) mo.completedDate = o.completedDate;
	if (o.completed !== undefined) mo.completed = o.completed;
	if (o.customerUserId !== undefined) mo.customerUserId = o.customerUserId;
	if (o.customerNumber !== undefined) mo.customerNumber = o.customerNumber;
	if (o.customerEan !== undefined) mo.customerEan = o.customerEan;
	if (o.customerRefId !== undefined) mo.customerRefId = o.customerRefId;
	if (o.customerCompany !== undefined) mo.customerCompany = o.customerCompany;
	if (o.customerTitle !== undefined) mo.customerTitle = o.customerTitle;
	if (o.customerName !== undefined) mo.customerName = o.customerName;
	if (o.customerFirstName !== undefined)
		mo.customerFirstName = o.customerFirstName;
	if (o.customerSurname !== undefined) mo.customerSurname = o.customerSurname;
	if (o.customerMiddleName !== undefined)
		mo.customerMiddleName = o.customerMiddleName;
	if (o.customerHouseNumber !== undefined)
		mo.customerHouseNumber = o.customerHouseNumber;
	if (o.customerInitials !== undefined)
		mo.customerInitials = o.customerInitials;
	if (o.customerPrefix !== undefined) mo.customerPrefix = o.customerPrefix;
	if (o.customerAddress !== undefined) mo.customerAddress = o.customerAddress;
	if (o.customerAddress2 !== undefined)
		mo.customerAddress2 = o.customerAddress2;
	if (o.customerZip !== undefined) mo.customerZip = o.customerZip;
	if (o.customerCity !== undefined) mo.customerCity = o.customerCity;
	if (o.customerCountry !== undefined) mo.customerCountry = o.customerCountry;
	if (o.customerCountryCode !== undefined)
		mo.customerCountryCode = o.customerCountryCode;
	if (o.customerRegion !== undefined) mo.customerRegion = o.customerRegion;
	if (o.customerPhone !== undefined) mo.customerPhone = o.customerPhone;
	if (o.customerEmail !== undefined) mo.customerEmail = o.customerEmail;
	if (o.customerCell !== undefined) mo.customerCell = o.customerCell;
	if (o.customerAccepted !== undefined)
		mo.customerAccepted = o.customerAccepted;
	if (o.customerComment !== undefined) mo.customerComment = o.customerComment;
	if (o.deliveryCompany !== undefined) mo.deliveryCompany = o.deliveryCompany;
	if (o.deliveryName !== undefined) mo.deliveryName = o.deliveryName;
	if (o.deliveryFirstName !== undefined)
		mo.deliveryFirstName = o.deliveryFirstName;
	if (o.deliverySurname !== undefined) mo.deliverySurname = o.deliverySurname;
	if (o.deliveryMiddleName !== undefined)
		mo.deliveryMiddleName = o.deliveryMiddleName;
	if (o.deliveryTitle !== undefined) mo.deliveryTitle = o.deliveryTitle;
	if (o.deliveryHouseNumber !== undefined)
		mo.deliveryHouseNumber = o.deliveryHouseNumber;
	if (o.deliveryInitials !== undefined)
		mo.deliveryInitials = o.deliveryInitials;
	if (o.deliveryPrefix !== undefined) mo.deliveryPrefix = o.deliveryPrefix;
	if (o.deliveryAddress !== undefined) mo.deliveryAddress = o.deliveryAddress;
	if (o.deliveryAddress2 !== undefined)
		mo.deliveryAddress2 = o.deliveryAddress2;
	if (o.deliveryZip !== undefined) mo.deliveryZip = o.deliveryZip;
	if (o.deliveryCity !== undefined) mo.deliveryCity = o.deliveryCity;
	if (o.deliveryCountry !== undefined) mo.deliveryCountry = o.deliveryCountry;
	if (o.deliveryCountryCode !== undefined)
		mo.deliveryCountryCode = o.deliveryCountryCode;
	if (o.deliveryRegion !== undefined) mo.deliveryRegion = o.deliveryRegion;
	if (o.deliveryPhone !== undefined) mo.deliveryPhone = o.deliveryPhone;
	if (o.deliveryEmail !== undefined) mo.deliveryEmail = o.deliveryEmail;
	if (o.deliveryCell !== undefined) mo.deliveryCell = o.deliveryCell;
	if (o.orderLines !== undefined)
		mo.orderLines = o.orderLines.map((ol: OrderLineDto) =>
			mapDynamicwebOrderline(ol),
		);
	if (o.price !== undefined) mo.price = mapDynamicwebPrice(o.price);
	if (o.totalPriceWithoutDiscountsFeesAndTaxes !== undefined)
		mo.totalPriceWithoutDiscountsFeesAndTaxes = mapDynamicwebPrice(
			o.totalPriceWithoutDiscountsFeesAndTaxes,
		);
	if (o.priceBeforeFees !== undefined)
		mo.priceBeforeFees = mapDynamicwebPrice(o.priceBeforeFees);
	if (o.shippingFee !== undefined)
		mo.shippingFee = mapDynamicwebPrice(o.shippingFee);
	if (o.shippingMethod !== undefined)
		mo.shippingMethod = mapDynamicwebShippingMethod(o.shippingMethod);
	if (o.paymentMethod !== undefined)
		mo.paymentMethod = mapDynamicwebPaymentMethod(o.paymentMethod);
	if (o.paymentFee !== undefined) mo.paymentFee = o.paymentFee;

	return mo;
}
