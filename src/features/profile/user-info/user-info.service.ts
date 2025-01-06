import { Injectable } from '@nestjs/common';
import { UserInfoStrategy } from './interfaces/user-info-strategy.interface';
import { AuthHeadersDto } from 'src/common/dto/headers-auth.dto';
import { HttpService } from '@nestjs/axios';
import { getStrategyBasedOnConfig } from 'src/common/helpers/strategy-helper';
import { DynamicwebUserInfoStrategy } from './strategies/dynamicweb-user-info.strategy';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { ShopifyUserInfoStrategy } from './strategies/shopify-user-info.strategy';
import { UmbracoUserInfoStrategy } from './strategies/umbraco-user-info.strategy';

@Injectable()
export class UserInfoService {
	private strategy: UserInfoStrategy;

	constructor(private readonly httpService: HttpService) {
		this.strategy = this.getStrategy(this.httpService);
	}

	private getStrategy(httpService: HttpService): UserInfoStrategy {
		return getStrategyBasedOnConfig<UserInfoStrategy>(
			{
				dynamicweb: (httpService) =>
					new DynamicwebUserInfoStrategy(httpService),
				umbraco: (httpService) => 
					new UmbracoUserInfoStrategy(httpService),
				shopify: (httpService) => 
					new ShopifyUserInfoStrategy(httpService),
			},
			httpService,
		);
	}

	getUserInfo(authHeader: AuthHeadersDto) {
		return this.strategy.getUserInfo(authHeader);
	}

	updateUserInfo(authHeader: AuthHeadersDto, userInfo: UpdateUserInfoDto) {
		return this.strategy.updateUserInfo(authHeader, userInfo);
	}
}
