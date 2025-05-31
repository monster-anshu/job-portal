import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { CheckAbility } from '~/user/ability.decorator';
import { GetSession } from '~/session/session.decorator';
import { UserGuard } from '~/user/user.guard';

@UseGuards(UserGuard)
@Controller('job-application/candidate')
export class JobApplicationCanidateController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @CheckAbility('CANDIDATE')
  @Post(':jobId')
  async apply(
    @GetSession('userId') userId: string,
    @Param('jobId') jobId: string,
  ) {
    const application = await this.jobApplicationService.create(userId, jobId);

    return {
      isSuccess: true,
      application,
    };
  }

  @CheckAbility('CANDIDATE')
  @Get()
  async list(@GetSession('userId') userId: string) {
    const applications = await this.jobApplicationService.list({
      candidateId: userId,
    });

    return {
      isSuccess: true,
      applications,
    };
  }
}
