import { Global, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModelProvider } from '~/mongo/user.schema';

@Global()
@Module({
  controllers: [UserController],
  providers: [UserService, UserModelProvider],
  exports: [UserService],
})
export class UserModule {}
