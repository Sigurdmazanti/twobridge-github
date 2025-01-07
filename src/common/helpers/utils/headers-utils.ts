import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';

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
export function createAuthHeaders(authHeader?: string): {} {
	const refreshHeaders: any = {};

	if (authHeader) {
		refreshHeaders['authorization'] = authHeader;
		return refreshHeaders;
	}

	return {};
}

export function splitBearerToken(
	authHeader: string,
): string | null {
	// const aHeader =
	// 	typeof authHeader === 'string' ? authHeader : authHeader.authorization;
	const aHeader = authHeader;
	const parts = aHeader.split(' ');

	if (parts.length === 2) {
		const scheme = parts[0];
		const credentials = parts[1];

		if (/^Bearer$/i.test(scheme)) {
			return credentials;
		}
	}

	return null;
}
