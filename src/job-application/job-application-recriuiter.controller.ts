import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { CheckAbility } from '~/user/ability.decorator';
import { GetSession } from '~/session/session.decorator';
import { UserGuard } from '~/user/user.guard';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(UserGuard)
@Controller('job-application/recriuiter')
export class JobApplicationRecriuiterController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @ApiOperation({
    summary: 'Get a job application by ID for recriuiter',
    description: 'Allows a recriuiter to retrieve a job applications.',
  })
  @CheckAbility('RECRIUITER')
  @Get()
  async list(@GetSession('userId') userId: string) {
    const applications = await this.jobApplicationService.list({
      recriuiterId: userId,
    });

    return {
      isSuccess: true,
      applications,
    };
  }
}
