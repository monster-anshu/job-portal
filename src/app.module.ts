import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { JobApplicationModule } from './job-application/job-application.module';

@Module({
  imports: [AuthModule, UserModule, JobModule, JobApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
