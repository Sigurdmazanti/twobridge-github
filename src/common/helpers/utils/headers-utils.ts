/**
 * Creates an HTTP authorization header object.
 *
 * This function generates an object containing the "authorization" header,
 * If an authorization token is provided, it will be included in the returned
 * headers object. If no token is provided, an empty object will be returned.
 *
 * @param authHeader - The authorization token to be included in the headers.
 *                     If not provided, no "authorization" header will be added.
 * @returns A `Record<string, string>` representing the headers,
 *          containing the "authorization" key if the token is provided.
 */
export function createAuthHeaders(authHeader?: string): Record<string, string> {
	const refreshHeaders: Record<string, string> = {};

	if (authHeader) {
		refreshHeaders['authorization'] = authHeader;
		return refreshHeaders;
	}

	return {};
}

/**
 * Splits an authorization header to extract the Bearer token.
 *
 * @param {string} authHeader - The authorization header containing the Bearer token.
 * @returns {string | null} The extracted Bearer token if valid, or `null` if the header is invalid.
 *
 */
export function splitBearerToken(authHeader: string): string | null {
	const parts = authHeader.split(' ');

	if (parts.length === 2) {
		const [scheme, credentials] = parts;

		if (/^Bearer$/i.test(scheme)) {
			return credentials;
		}
	}

	return null;
}
