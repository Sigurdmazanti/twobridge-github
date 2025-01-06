import { OrderDto } from 'src/features/ecom/orders/dto/order.dto';
import { mapDynamicwebOrderline } from './orderline.mapper';
import { OrderLineDto } from 'src/features/ecom/orders/dto/orderline.dto';
import { mapDynamicwebPrice } from './price.mapper';
import { mapDynamicwebPaymentMethod } from './paymentmethod.mapper';
import { mapDynamicwebShippingMethod } from './shippingmethod.mapper';

export function mapDynamicwebOrder(o: any): OrderDto {
	const mo = new OrderDto();

    if (o.currencyCode) mo.currencyCode = o.currencyCode;
    if (o.countryCode) mo.countryCode = o.countryCode;
    if (o.languageId) mo.languageId = o.languageId;
    if (o.id) mo.id = o.id;
    if (o.secret) mo.secret = o.secret;
    if (o.secondaryUserId) mo.secondaryUserId = o.secondaryUserId;
    if (o.secondaryUserName) mo.secondaryUserName = o.secondaryUserName;
    if (o.shopId) mo.shopId = o.shopId;
    if (o.createdAt) mo.createdAt = o.createdAt;
    if (o.modified) mo.modified = o.modified;
    if (o.completedDate) mo.completedDate = o.completedDate;
    if (o.completed) mo.completed = o.completed;
    if (o.customerUserId) mo.customerUserId = o.customerUserId;
    if (o.customerNumber) mo.customerNumber = o.customerNumber;
    if (o.customerEan) mo.customerEan = o.customerEan;
    if (o.customerRefId) mo.customerRefId = o.customerRefId;
    if (o.customerCompany) mo.customerCompany = o.customerCompany;
    if (o.customerTitle) mo.customerTitle = o.customerTitle;
    if (o.customerName) mo.customerName = o.customerName;
    if (o.customerFirstName) mo.customerFirstName = o.customerFirstName;
    if (o.customerSurname) mo.customerSurname = o.customerSurname;
    if (o.customerMiddleName) mo.customerMiddleName = o.customerMiddleName;
    if (o.customerHouseNumber) mo.customerHouseNumber = o.customerHouseNumber;
    if (o.customerInitials) mo.customerInitials = o.customerInitials;
    if (o.customerPrefix) mo.customerPrefix = o.customerPrefix;
    if (o.customerAddress) mo.customerAddress = o.customerAddress;
    if (o.customerAddress2) mo.customerAddress2 = o.customerAddress2;
    if (o.customerZip) mo.customerZip = o.customerZip;
    if (o.customerCity) mo.customerCity = o.customerCity;
    if (o.customerCountry) mo.customerCountry = o.customerCountry;
    if (o.customerCountryCode) mo.customerCountryCode = o.customerCountryCode;
    if (o.customerRegion) mo.customerRegion = o.customerRegion;
    if (o.customerPhone) mo.customerPhone = o.customerPhone;
    if (o.customerEmail) mo.customerEmail = o.customerEmail;
    if (o.customerCell) mo.customerCell = o.customerCell;
    if (o.customerAccepted) mo.customerAccepted = o.customerAccepted;
    if (o.customerComment) mo.customerComment = o.customerComment;
    if (o.deliveryCompany) mo.deliveryCompany = o.deliveryCompany;
    if (o.deliveryName) mo.deliveryName = o.deliveryName;
    if (o.deliveryFirstName) mo.deliveryFirstName = o.deliveryFirstName;
    if (o.deliverySurname) mo.deliverySurname = o.deliverySurname;
    if (o.deliveryMiddleName) mo.deliveryMiddleName = o.deliveryMiddleName;
    if (o.deliveryTitle) mo.deliveryTitle = o.deliveryTitle;
    if (o.deliveryHouseNumber) mo.deliveryHouseNumber = o.deliveryHouseNumber;
    if (o.deliveryInitials) mo.deliveryInitials = o.deliveryInitials;
    if (o.deliveryPrefix) mo.deliveryPrefix = o.deliveryPrefix;
    if (o.deliveryAddress) mo.deliveryAddress = o.deliveryAddress;
    if (o.deliveryAddress2) mo.deliveryAddress2 = o.deliveryAddress2;
    if (o.deliveryZip) mo.deliveryZip = o.deliveryZip;
    if (o.deliveryCity) mo.deliveryCity = o.deliveryCity;
    if (o.deliveryCountry) mo.deliveryCountry = o.deliveryCountry;
    if (o.deliveryCountryCode) mo.deliveryCountryCode = o.deliveryCountryCode;
    if (o.deliveryRegion) mo.deliveryRegion = o.deliveryRegion;
    if (o.deliveryPhone) mo.deliveryPhone = o.deliveryPhone;
    if (o.deliveryEmail) mo.deliveryEmail = o.deliveryEmail;
    if (o.deliveryCell) mo.deliveryCell = o.deliveryCell;
	if (o.orderLines) mo.orderLines = o.orderLines.map((ol: OrderLineDto) =>
		mapDynamicwebOrderline(ol),
	)
	if(o.price) mo.price = mapDynamicwebPrice(o.price)
	if(o.totalPriceWithoutDiscountsFeesAndTaxes) mo.totalPriceWithoutDiscountsFeesAndTaxes = mapDynamicwebPrice(o.totalPriceWithoutDiscountsFeesAndTaxes)
	if(o.priceBeforeFees) mo.priceBeforeFees = mapDynamicwebPrice(o.priceBeforeFees)
	if(o.shippingFee) mo.shippingFee = mapDynamicwebPrice(o.shippingFee)
	if(o.shippingMethod) mo.shippingMethod = mapDynamicwebShippingMethod(o.shippingMethod)
	if(o.paymentMethod) mo.paymentMethod = mapDynamicwebPaymentMethod(o.paymentMethod)
	if(o.paymentFee) mo.paymentFee = o.paymentFee
	
	return mo;
}
