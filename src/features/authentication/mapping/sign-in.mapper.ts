import { SignInResponseDto } from '../dto/sign-in.dto';

export const mapDynamicwebSignInResponse = (
	response: any,
): SignInResponseDto => {
	const r = new SignInResponseDto(response.token);

	return r;
};

export const mapShopifySignInResponse = (
	response: any,
): SignInResponseDto => {
	const r = new SignInResponseDto(response.data.data.customerAccessTokenCreate.customerAccessToken.accessToken);
	
	return r;
};
