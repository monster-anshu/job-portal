import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetSession } from '~/session/session.decorator';
import { UserGuard } from '~/user/user.guard';
import { CreateJobDto } from './dto/create-job.dto';
import { CheckAbility } from '~/user/ability.decorator';
import { JobService } from './job.service';
import { User } from '~/mongo/user.schema';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(UserGuard)
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @ApiOperation({
    description:
      'List all jobs. If user has RECRIUITER access, it will list only their jobs.',
    summary: 'List jobs',
  })
  @Get()
  async list(
    @GetSession('userId') userId: string,
    @GetSession('access') access: User['access'],
  ) {
    const jobs = await this.jobService.list(
      access.includes('RECRIUITER') ? userId : undefined,
    );

    return {
      isSuccess: true,
      jobs,
    };
  }

  @ApiOperation({
    description: 'Get job by ID.',
    summary: 'Get job by ID',
  })
  @Get(':jobId')
  async getById(@Param('jobId') jobId: string) {
    const job = await this.jobService.getById(jobId);

    return {
      isSuccess: true,
      job,
    };
  }

  @ApiOperation({
    description:
      'Create a new job. Only accessible by users with RECRIUITER access.',
    summary: 'Create job',
  })
  @CheckAbility('RECRIUITER')
  @Post()
  async create(
    @GetSession('userId') userId: string,
    @Body() body: CreateJobDto,
  ) {
    const job = await this.jobService.create(userId, body);

    return {
      isSuccess: true,
      job,
    };
  }
}
