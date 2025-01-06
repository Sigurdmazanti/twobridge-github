import { GetUserInfoResponseDto } from '../dto/get-user-info-response.dto';

export const mapDynamicwebGetUserInfo = (
	response: any,
): GetUserInfoResponseDto => {
	const r: GetUserInfoResponseDto = {};

	if (response?.id) r.id = response.id;
	if (response?.userName) r.userName = response.userName;
	if (response?.name) r.name = response.name;
	if (response?.firstName) r.firstName = response.firstName;
	if (response?.middleName) r.middleName = response.middleName;
	if (response?.lastName) r.lastName = response.lastName;
	if (response?.customerNumber) r.customerNumber = response.customerNumber;
	if (response?.address) r.address = response.address;
	if (response?.address2) r.address2 = response.address2;
	if (response?.houseNumber) r.houseNumber = response.houseNumber;
	if (response?.city) r.city = response.city;
	if (response?.zip) r.zip = response.zip;
	if (response?.country) r.country = response.country;
	if (response?.phone) r.phone = response.phone;
	if (response?.email) r.email = response.email;
	if (response?.shopId) r.shopId = response.shopId;
	if (response?.countryCode) r.countryCode = response.countryCode;
	if (response?.currency) r.currency = response.currency;
	if (response?.externalId) r.externalId = response.externalId;
	if (response?.uniqueId) r.uniqueId = response.uniqueId;

	return r;
};

export const mapShopifyGetUserInfo = (
	response: any,
): GetUserInfoResponseDto => {
	const data = response.data;
	const c = data.customer || data.customerUpdate?.customer;
	const a = c?.defaultAddress || {};
	const r: GetUserInfoResponseDto = {};

	// Safely map the fields with if statements
	if (c?.id) r.id = c.id;
	if (c?.displayName) r.userName = c.displayName;
	if (c?.firstName && c?.lastName) r.name = `${c.firstName} ${c.lastName}`;
	if (c?.firstName) r.firstName = c.firstName;
	if (c?.lastName) r.lastName = c.lastName;
	if (c?.phone) r.phone = c.phone;
	if (c?.email) r.email = c.email;

	if (a.address1) r.address = a.address1;
	if (a.address2) r.address2 = a.address2;
	if (a.city) r.city = a.city;
	if (a.zip) r.zip = a.zip;
	if (a.country) r.country = a.country;
	if (a.countryCodeV2) r.countryCode = a.countryCodeV2;

	return r;
};
