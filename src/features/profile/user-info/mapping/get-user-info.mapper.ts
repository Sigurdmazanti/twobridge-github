import { GetUserInfoResponseDto } from '../dto/get-user-info-response.dto';

export const mapDynamicwebGetUserInfo = (
	response: any,
): GetUserInfoResponseDto => {
	const r: GetUserInfoResponseDto = {};

	if (response?.id !== undefined) r.id = response.id;
	if (response?.userName !== undefined) r.userName = response.userName;
	if (response?.name !== undefined) r.name = response.name;
	if (response?.firstName !== undefined) r.firstName = response.firstName;
	if (response?.middleName !== undefined) r.middleName = response.middleName;
	if (response?.lastName !== undefined) r.lastName = response.lastName;
	if (response?.customerNumber !== undefined) r.customerNumber = response.customerNumber;
	if (response?.address !== undefined) r.address = response.address;
	if (response?.address2 !== undefined) r.address2 = response.address2;
	if (response?.houseNumber !== undefined) r.houseNumber = response.houseNumber;
	if (response?.city !== undefined) r.city = response.city;
	if (response?.zip !== undefined) r.zip = response.zip;
	if (response?.country !== undefined) r.country = response.country;
	if (response?.phone !== undefined) r.phone = response.phone;
	if (response?.email !== undefined) r.email = response.email;
	if (response?.shopId !== undefined) r.shopId = response.shopId;
	if (response?.countryCode !== undefined) r.countryCode = response.countryCode;
	if (response?.currency !== undefined) r.currency = response.currency;
	if (response?.externalId !== undefined) r.externalId = response.externalId;
	if (response?.uniqueId !== undefined) r.uniqueId = response.uniqueId;

	return r;
};

export const mapShopifyGetUserInfo = (
	response: any,
): GetUserInfoResponseDto => {
	const data = response.data;
	const c = data.customer || data.customerUpdate?.customer;
	const a = c?.defaultAddress || {};
	const r: GetUserInfoResponseDto = {};

	if (c?.id !== undefined) r.id = c.id;
	if (c?.displayName !== undefined) r.userName = c.displayName;
	if (c?.firstName !== undefined && c?.lastName !== undefined) r.name = `${c.firstName} ${c.lastName}`;
	if (c?.firstName !== undefined) r.firstName = c.firstName;
	if (c?.lastName !== undefined) r.lastName = c.lastName;
	if (c?.phone !== undefined) r.phone = c.phone;
	if (c?.email !== undefined) r.email = c.email;

	if (a.address1 !== undefined) r.address = a.address1;
	if (a.address2 !== undefined) r.address2 = a.address2;
	if (a.city !== undefined) r.city = a.city;
	if (a.zip !== undefined) r.zip = a.zip;
	if (a.country !== undefined) r.country = a.country;
	if (a.countryCodeV2 !== undefined) r.countryCode = a.countryCodeV2;
	if(a.test !== undefined) r.countryCode = a.test;

	return r;
};
//TODO: SET UNDEFINED VALUES

