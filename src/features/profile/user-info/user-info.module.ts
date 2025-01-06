import { Module } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';

@Module({
	providers: [UserInfoService],
	controllers: [UserInfoController],
})
export class UserInfoModule {}
