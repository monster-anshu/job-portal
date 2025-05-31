import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetSession } from '~/session/session.decorator';
import { UserGuard } from '~/user/user.guard';
import { CreateJobDto } from './dto/create-job.dto';
import { CheckAbility } from '~/user/ability.decorator';
import { JobService } from './job.service';
import { User } from '~/mongo/user.schema';
import { access } from 'fs';

@UseGuards(UserGuard)
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

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
