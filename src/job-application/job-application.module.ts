import { Module } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { JobApplicationModelProvider } from '~/mongo/job-application.schema';
import { JobModule } from '~/job/job.module';
import { JobApplicationCanidateController } from './job-application-candidate.controller';
import { JobApplicationRecriuiterController } from './job-application-recriuiter.controller';

@Module({
  controllers: [
    JobApplicationCanidateController,
    JobApplicationRecriuiterController,
  ],
  providers: [JobApplicationService, JobApplicationModelProvider],
  imports: [JobModule],
})
export class JobApplicationModule {}
