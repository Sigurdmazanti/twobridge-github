import { Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { ProfileModule } from './profile/profile.module';
import { EcomModule } from './ecom/ecom.module';

@Module({
	imports: [AuthModule, ProfileModule, EcomModule],
})
export class FeaturesModule {}
