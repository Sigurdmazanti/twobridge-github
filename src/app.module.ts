import { Module } from '@nestjs/common';
import { GlobalModule } from './common/global/global.module';
import { FeaturesModule } from './features/features.module';

@Module({
	imports: [GlobalModule, FeaturesModule],
})
export class AppModule {}
