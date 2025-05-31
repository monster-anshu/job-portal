import { Inject, Injectable } from '@nestjs/common';
import { JobModelProvider } from '~/mongo/job.schema';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobService {
  constructor(
    @Inject(JobModelProvider.provide)
    private readonly jobModel: typeof JobModelProvider.useValue,
  ) {}

  async create(
    userId: string,
    { company, description, name, skills }: CreateJobDto,
  ) {
    const job = await this.jobModel.create({
      company: company,
      description: description,
      name: name,
      skills: skills,
      userId: userId,
    });

    return job.toObject();
  }
}
