import { HttpService } from '@nestjs/axios';

/**
 * Generalized strategy selector for CMS-based strategies.
 * Automatically provides `HttpService` to all strategy factories.
 * @param strategies - An object mapping CMS providers to their respective strategy constructors.
 * @param httpService - The shared `HttpService` instance.
 * @returns The instantiated strategy for the given CMS provider.
 */
export function getStrategyBasedOnConfig<T>(
	strategies: { [key: string]: (httpService: HttpService) => T },
	httpService: HttpService,
): T {
	const cmsProvider = process.env.CMS_PROVIDER;
	const strategyFactory = strategies[cmsProvider];
	return strategyFactory(httpService);
}
