import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';

@Module({
  imports: [AuthModule, UserModule, JobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
