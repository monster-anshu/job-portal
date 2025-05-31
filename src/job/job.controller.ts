import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetSession } from '~/session/session.decorator';
import { UserGuard } from '~/user/user.guard';
import { CreateJobDto } from './dto/create-job.dto';
import { CheckAbility } from '~/user/ability.decorator';
import { JobService } from './job.service';

@UseGuards(UserGuard)
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

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
