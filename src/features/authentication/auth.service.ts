import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { getStrategyBasedOnConfig } from 'src/common/helpers/strategy-helper';
import { DynamicwebAuthStrategy } from './strategies/dynamicweb-auth.strategy';
import { AuthStrategy } from './interfaces/auth-strategy.interface';
import { SignInRequestDto } from './dto/sign-in.dto';
import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import { ShopifyAuthStrategy } from './strategies/shopify-auth.strategy';
import { UmbracoAuthStrategy } from './strategies/umbraco-auth.strategy';

@Injectable()
export class AuthService {
	private strategy: AuthStrategy;

	constructor(private readonly httpService: HttpService) {
		this.strategy = this.getStrategy(this.httpService);
	}

	private getStrategy(httpService: HttpService): AuthStrategy {
		return getStrategyBasedOnConfig<AuthStrategy>(
			{
				dynamicweb: (httpService) =>
					new DynamicwebAuthStrategy(httpService),
				umbraco: (httpService) => new UmbracoAuthStrategy(httpService),
				shopify: (httpService) => new ShopifyAuthStrategy(httpService),
			},
			httpService,
		);
	}

	signIn(credentials: SignInRequestDto) {
		return this.strategy.signIn(credentials);
	}

	refreshToken(authHeader: string) {
		return this.strategy.refreshToken(authHeader);
	}
}
