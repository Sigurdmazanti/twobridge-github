import { getShopifyCustomerIdByToken } from './get-customer-info-util';
import { HttpService } from '@nestjs/axios';
import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import { of, throwError } from 'rxjs';
import { Test, TestingModule } from '@nestjs/testing';
import { handleError } from '../../utils/return-utils';
import { axiosSuccess } from '../../axios-object-helper';

jest.mock('../../utils/return-utils');

describe('getShopifyCustomerIdByToken', () => {
	let httpService: HttpService;

	beforeEach(async () => {
		const mockHttpService = {
			post: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: HttpService,
					useValue: mockHttpService,
				},
			],
		}).compile();

		httpService = module.get<HttpService>(HttpService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return customer ID on successful API call', async () => {
		const authHeader: AuthHeadersDto = {
			authorization: 'Bearer tokenXYZ',
		};

		const mirroredAxiosSuccess = axiosSuccess;
		mirroredAxiosSuccess.data = {
			data: {
				customer: {
					id: 'gid://shopify/Customer/12345',
				},
			},
		};

		jest.spyOn(httpService, 'post').mockImplementation(() =>
			of(mirroredAxiosSuccess),
		);

		const result = await getShopifyCustomerIdByToken(
			authHeader,
			httpService,
		);

		expect(result).toEqual('gid://shopify/Customer/12345');
		expect(httpService.post).toHaveBeenCalledWith(
			process.env.SHOPIFY_STOREFRONT_API_URL,
			{
				query: expect.any(String),
				variables: {
					customerAccessToken: 'tokenXYZ',
				},
			},
			{
				headers: {
					'X-Shopify-Storefront-Access-Token':
						process.env.SHOPIFY_PUBLIC_KEY,
				},
			},
		);
	});

	it('should call handleError on API error', async () => {
		const authHeader: AuthHeadersDto = {
			authorization: 'Bearer some-invalid-token',
		};

		// Create the error inside a factory function to avoid the deprecation
		const mockError = new Error('API Error');

		// Mock the post method to throw an error using throwError with a factory function
		jest.spyOn(httpService, 'post').mockImplementation(() =>
			throwError(() => mockError),
		);

		// Execute the function that calls the mocked service
		await getShopifyCustomerIdByToken(authHeader, httpService);

		// Check if the handleError function was called with the mock error
		expect(handleError).toHaveBeenCalledWith(mockError);
	});
});
