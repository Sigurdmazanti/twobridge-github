import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { CredentialsModule } from './credentials/credentials.module';
import { UserInfoModule } from './user-info/user-info.module';

@Module({
	providers: [ProfileService],
	controllers: [ProfileController],
	imports: [CredentialsModule, UserInfoModule],
})
export class ProfileModule {}
