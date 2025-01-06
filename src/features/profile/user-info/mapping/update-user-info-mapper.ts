import { GetUserInfoResponseDto } from '../dto/get-user-info-response.dto';

export const mapDynamicwebUpdateUserInfo = (
    ui: any,
): Partial<GetUserInfoResponseDto> => {
    const uim: Partial<GetUserInfoResponseDto> = {};

    if (ui.id) uim.id = ui.id;
    if (ui.userName) uim.userName = ui.userName;
    if (ui.name) uim.name = ui.name;
    if (ui.firstName) uim.firstName = ui.firstName;
    if (ui.middleName) uim.middleName = ui.middleName;
    if (ui.lastName) uim.lastName = ui.lastName;
    if (ui.customerNumber) uim.customerNumber = ui.customerNumber;
    if (ui.address) uim.address = ui.address;
    if (ui.address2) uim.address2 = ui.address2;
    if (ui.houseNumber) uim.houseNumber = ui.houseNumber;
    if (ui.city) uim.city = ui.city;
    if (ui.zip) uim.zip = ui.zip;
    if (ui.country) uim.country = ui.country;
    if (ui.phone) uim.phone = ui.phone;
    if (ui.email) uim.email = ui.email;
    if (ui.shopId) uim.shopId = ui.shopId;
    if (ui.countryCode) uim.countryCode = ui.countryCode;
    if (ui.currency) uim.currency = ui.currency;
    if (ui.externalId) uim.externalId = ui.externalId;
    if (ui.uniqueId) uim.uniqueId = ui.uniqueId;

    return uim;
};

export const mapShopifyUpdateUserInfoRequest = (
	req: GetUserInfoResponseDto,
): any => {
	const r: any = {};

	if (req.id) r.id = req.id;
	if (req.userName) r.displayName = req.userName;
	if (req.firstName) r.firstName = req.firstName;
	if (req.lastName) r.lastName = req.lastName;
	if (req.email) r.email = req.email;
	if (req.phone) r.phone = req.phone;

	const defaultAddress: any = {};
	if (req.address) defaultAddress.address1 = req.address;
	if (req.address2) defaultAddress.address2 = req.address2;
	if (req.city) defaultAddress.city = req.city;
	if (req.zip) defaultAddress.zip = req.zip;
	if (req.country) defaultAddress.country = req.country;
	if (req.countryCode) defaultAddress.countryCodeV2 = req.countryCode;

	return r;
};