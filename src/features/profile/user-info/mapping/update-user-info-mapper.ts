import { GetUserInfoResponseDto } from '../dto/get-user-info-response.dto';

export const mapDynamicwebUpdateUserInfo = (
	ui: any,
): Partial<GetUserInfoResponseDto> => {
	const uim: Partial<GetUserInfoResponseDto> = {};

	if (ui.id !== undefined) uim.id = ui.id;
	if (ui.userName !== undefined) uim.userName = ui.userName;
	if (ui.name !== undefined) uim.name = ui.name;
	if (ui.firstName !== undefined) uim.firstName = ui.firstName;
	if (ui.middleName !== undefined) uim.middleName = ui.middleName;
	if (ui.lastName !== undefined) uim.lastName = ui.lastName;
	if (ui.customerNumber !== undefined) uim.customerNumber = ui.customerNumber;
	if (ui.address !== undefined) uim.address = ui.address;
	if (ui.address2 !== undefined) uim.address2 = ui.address2;
	if (ui.houseNumber !== undefined) uim.houseNumber = ui.houseNumber;
	if (ui.city !== undefined) uim.city = ui.city;
	if (ui.zip !== undefined) uim.zip = ui.zip;
	if (ui.country !== undefined) uim.country = ui.country;
	if (ui.phone !== undefined) uim.phone = ui.phone;
	if (ui.email !== undefined) uim.email = ui.email;
	if (ui.shopId !== undefined) uim.shopId = ui.shopId;
	if (ui.countryCode !== undefined) uim.countryCode = ui.countryCode;
	if (ui.currency !== undefined) uim.currency = ui.currency;
	if (ui.externalId !== undefined) uim.externalId = ui.externalId;
	if (ui.uniqueId !== undefined) uim.uniqueId = ui.uniqueId;

	return uim;
};

export const mapShopifyUpdateUserInfoRequest = (
	req: GetUserInfoResponseDto,
): any => {
	const r: any = {};

	if (req.id !== undefined) r.id = req.id;
	if (req.userName !== undefined) r.displayName = req.userName;
	if (req.firstName !== undefined) r.firstName = req.firstName;
	if (req.lastName !== undefined) r.lastName = req.lastName;
	if (req.email !== undefined) r.email = req.email;
	if (req.phone !== undefined) r.phone = req.phone;

	const defaultAddress: any = {};
	if (req.address !== undefined) defaultAddress.address1 = req.address;
	if (req.address2 !== undefined) defaultAddress.address2 = req.address2;
	if (req.city !== undefined) defaultAddress.city = req.city;
	if (req.zip !== undefined) defaultAddress.zip = req.zip;
	if (req.country !== undefined) defaultAddress.country = req.country;
	if (req.countryCode !== undefined) defaultAddress.countryCodeV2 = req.countryCode;

	return r;
};
