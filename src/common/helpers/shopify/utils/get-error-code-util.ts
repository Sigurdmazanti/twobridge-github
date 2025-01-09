import { ShopifyErrorCode } from 'src/common/interfaces/shopify/error-codes.interface';

/**
 * Extracts the first error code from a Shopify response object.
 *
 * The function recursively searches through the response object, looking for
 * any objects that contain an error code (`code` property). It will return
 * the first error code it encounters or `null` if no error code is found.
 *
 * @param {any} response - The Shopify response object to extract error codes from.
 * @returns {ShopifyErrorCode | null} - The first error code found, or `null` if no error code is found.
 */
export function detectShopifyErrors(response: any): {
	status: number;
	function: string;
	from?: string;
	message?: string;
} | null {
	if (response?.data) {
		const functionName = Object.keys(response.data)?.[0];

		if (functionName && response.data[functionName]) {
			const errors =
				response.data[functionName].customerUserErrors ||
				response.data[functionName].userErrors;

			if (!errors) return null;

			if (Array.isArray(errors)) {
				const firstError =
					errors.find((error: any) => error.code) || errors?.[0];

				if (firstError) {
					return {
						status:
							getHttpCodeForShopifyError(firstError.code) || 400,
						function: functionName,
						from: firstError,
					};
				}
			}
		}

		if (functionName && response.data[functionName] === null) {
			return {
				status: 404,
				function: functionName,
				message: 'Not Found',
			};
		}
	}

	if (response?.errors) {
		const error = response.errors[0];

		return {
			status: getHttpCodeForShopifyError(error.extensions?.code) || 400,
			function: error.path?.[0] || 'unknown',
			from: error,
		};
	}

	return null;
}

/**
 * Maps a Shopify error code to an HTTP status code.
 *
 * @param {ShopifyErrorCode} errorCode - The Shopify error code to map.
 * @returns {number} - The corresponding HTTP status code.
 */
export function getHttpCodeForShopifyError(
	errorCode: ShopifyErrorCode,
): number {
	const errorCodeToHttpMap: Record<ShopifyErrorCode, number> = {
		ACCESS_DENIED: 403,
		ALREADY_ENABLED: 409,
		BAD_DOMAIN: 400,
		BLANK: 400,
		CONTAINS_HTML_TAGS: 400,
		CONTAINS_URL: 400,
		CUSTOMER_DISABLED: 403,
		INVALID: 403,
		INVALID_MULTIPASS_REQUEST: 400,
		NOT_FOUND: 404,
		PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE: 400,
		TAKEN: 409,
		TOKEN_INVALID: 400,
		TOO_LONG: 400,
		TOO_SHORT: 400,
		UNIDENTIFIED_CUSTOMER: 404,
		INVALID_TOKEN: 401,
		UNAUTHENTICATED: 401,
		CONFLICT: 409,
		INTERNAL_SERVER_ERROR: 500,
		SERVICE_UNAVAILABLE: 503,
		THROTTLED: 429,
	};

	return errorCodeToHttpMap[errorCode] || 400;
}
