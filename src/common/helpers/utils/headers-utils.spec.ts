import { AuthHeadersDto } from "src/common/dto/headers-auth.dto";
import { createAuthHeaders, splitBearerToken } from "./headers-utils";

describe('Headers utility functions', () => {
    describe('createAuthHeaders', () => {
        it('should return an empty object if no authHeader is provided', () => {
            expect(createAuthHeaders()).toEqual({});
        });

        it('should return an object with the authorization header if authHeader is provided', () => {
            const mockAuthHeader: AuthHeadersDto = { 
                authorization: 'Bearer token' 
            };

            expect(createAuthHeaders(mockAuthHeader.authorization)).toEqual(mockAuthHeader);
        });

        it('should return the correct authorization header with the token', () => {
            const mockAuthHeader: AuthHeadersDto = { 
                authorization: 'Bearer token' 
            };

            const result = createAuthHeaders(mockAuthHeader.authorization);
            expect(result).toHaveProperty('authorization', mockAuthHeader.authorization);
        });
    });

    describe('splitBearerToken', () => {
        it('should return the token if the authorization header is valid', () => {
            const validAuthHeader = 'Bearer token';
            const result = splitBearerToken(validAuthHeader);
            expect(result).toBe('token');
        });

        it('should return null if the header is missing the Bearer prefix', () => {
            const invalidAuthHeader = 'Token';
            const result = splitBearerToken(invalidAuthHeader);
            expect(result).toBeNull();
        });

        it('should return null if the header does not contain exactly two parts', () => {
            const invalidAuthHeader = 'Bearer';
            const result = splitBearerToken(invalidAuthHeader);
            expect(result).toBeNull();
        });

        it('should return null if the header is empty', () => {
            const emptyAuthHeader = '';
            const result = splitBearerToken(emptyAuthHeader);
            expect(result).toBeNull();
        });

        it('should return null if the header does not start with "Bearer"', () => {
            const invalidAuthHeader = 'Token some-token';
            const result = splitBearerToken(invalidAuthHeader);
            expect(result).toBeNull();
        });
    });

});