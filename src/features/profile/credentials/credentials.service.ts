import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { getStrategyBasedOnConfig } from 'src/common/helpers/strategy-helper';
import { CredentialsStrategy } from './interfaces/credentials-strategy.interface';
import { DynamicwebCredentialsStrategy } from './strategies/dynamicweb-credentials.strategy';
import { ChangePasswordRequestDto } from './dto/change-password.dto';
import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import { ShopifyCredentialsStrategy } from './strategies/shopify-credentials.strategy';
import { UmbracoCredentialsStrategy } from './strategies/umbraco-credentials.strategy';

@Injectable()
export class CredentialsService {
	private strategy: CredentialsStrategy;

	constructor(private readonly httpService: HttpService) {
		this.strategy = this.getStrategy(this.httpService);
	}

	private getStrategy(httpService: HttpService): CredentialsStrategy {
		return getStrategyBasedOnConfig<CredentialsStrategy>(
			{
				dynamicweb: (httpService) =>
					new DynamicwebCredentialsStrategy(httpService),
				umbraco: (httpService) =>
					new UmbracoCredentialsStrategy(httpService),
				shopify: (httpService) =>
					new ShopifyCredentialsStrategy(httpService),
			},
			httpService,
		);
	}

	changePassword(
		authHeader: AuthHeadersDto,
		resetPassword: ChangePasswordRequestDto,
	) {
		return this.strategy.changePassword(authHeader, resetPassword);
	}
}
