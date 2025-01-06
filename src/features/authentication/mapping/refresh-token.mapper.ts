import { RefreshTokenResponseDto } from '../dto/refresh-token.dto';

export const mapDynamicwebRefreshTokenResponse = (
	response: any,
): RefreshTokenResponseDto => {
	const r = new RefreshTokenResponseDto(response.token);

	return r;
};

export const mapShopifyRefreshTokenResponse = (
	response: any,
): RefreshTokenResponseDto => {
	const r = new RefreshTokenResponseDto(
		response.data.data.customerAccessTokenRenew.customerAccessToken.accessToken,
	);

	return r;
};
