import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
	imports: [
		HttpModule,
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
	],
	exports: [HttpModule, ConfigModule],
})
export class GlobalModule {
	constructor(private configService: ConfigService) {}
}
