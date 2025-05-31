import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModelProvider } from '~/mongo/user.schema';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserModelProvider],
})
export class AuthModule {}
