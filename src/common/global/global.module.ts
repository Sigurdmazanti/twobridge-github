import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Global()
@Module({
	imports: [
		HttpModule,
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		ThrottlerModule.forRoot([{
			ttl: 60,
			limit: 100,
		}]),
	],
	exports: [HttpModule, ConfigModule, ThrottlerModule],
	providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class GlobalModule {
	constructor(private configService: ConfigService) {}
}
