import { detectShopifyErrors, getHttpCodeForShopifyError } from './get-error-code-util';
import { ShopifyErrorCode } from 'src/common/interfaces/shopify/error-codes.interface';

describe('detectShopifyErrors', () => {
  
    it('should return null if no errors are present', () => {
        const response = {
            data: {
                someFunction: {
                    customerUserErrors: [],
                },
            },
        };

        const result = detectShopifyErrors(response);
        expect(result).toBeNull();
    });

    it('should return an error status if there are customerUserErrors', () => {
        const response = {
            data: {
                someFunction: {
                    customerUserErrors: [{ 
                        code: 'INVALID', 
                        message: 'Invalid request' 
                    }],
                },
            },
        };

        const result = detectShopifyErrors(response);
        expect(result).toEqual({
            status: 403,
            function: 'someFunction',
            from: response.data.someFunction.customerUserErrors[0],
        });
    });

    it('should return error details from userErrors if customerUserErrors are not present', () => {
        const response = {
            data: {
                someFunction: {
                    userErrors: [{ 
                        code: 'ACCESS_DENIED',
                        message: 'Access denied' 
                    }],
                },
            },
        };

        const result = detectShopifyErrors(response);
        expect(result).toEqual({
            status: 403,
            function: 'someFunction',
            from: response.data.someFunction.userErrors[0],
        });
    });

    it('should handle errors with the response.errors structure', () => {
        const response = {
            errors: [
                {
                    path: ['someFunction'],
                    extensions: { code: 'NOT_FOUND' },
                },
            ],
        };

        const result = detectShopifyErrors(response);
        expect(result).toEqual({
            status: 404,
            function: 'someFunction',
            from: response.errors[0],
        });
    });

    it('should return null if no matching error code or structure is found', () => {
        const response = {};
        const result = detectShopifyErrors(response);
        expect(result).toBeNull();
    });

    it('should return a "Not Found" error if functionName is null', () => {
        const response = {
            data: {
                someFunction: null,
            },
        };

        const result = detectShopifyErrors(response);
        expect(result).toEqual({
        status: 404,
            function: 'someFunction',
            message: 'Not Found',
        });
    });
});

describe('getHttpCodeForShopifyError', () => {
    it('should map Shopify error codes to correct HTTP status codes', () => {
        const testCases: [ShopifyErrorCode, number][] = [
            ['ACCESS_DENIED', 403],
            ['ALREADY_ENABLED', 409],
            ['BAD_DOMAIN', 400],
            ['NOT_FOUND', 404],
            ['INVALID_TOKEN', 401],
            ['INTERNAL_SERVER_ERROR', 500],
            ['SERVICE_UNAVAILABLE', 503],
            ['THROTTLED', 429],
            ['UNKNOWN_CODE' as ShopifyErrorCode, 400],
        ];

        testCases.forEach(([errorCode, expectedStatus]) => {
            const result = getHttpCodeForShopifyError(errorCode);
            expect(result).toBe(expectedStatus);
        });
    });
});
