import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { JobModelProvider } from '~/mongo/job.schema';

@Module({
  controllers: [JobController],
  providers: [JobService, JobModelProvider],
  exports: [JobService],
})
export class JobModule {}
