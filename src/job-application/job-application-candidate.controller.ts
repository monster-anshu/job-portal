import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { CheckAbility } from '~/user/ability.decorator';
import { GetSession } from '~/session/session.decorator';
import { UserGuard } from '~/user/user.guard';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(UserGuard)
@Controller('job-application/candidate')
export class JobApplicationCanidateController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @ApiOperation({
    description: 'Apply for a job by ID.',
    summary: 'Apply for a job',
  })
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

  @ApiOperation({
    description: 'List all job applications for the candidate.',
    summary: 'List job applications',
  })
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
