import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Job, JobModelProvider } from '~/mongo/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { FilterQuery } from 'mongoose';

@Injectable()
export class JobService {
  constructor(
    @Inject(JobModelProvider.provide)
    private readonly jobModel: typeof JobModelProvider.useValue,
  ) {}

  async list(userId?: string) {
    const filter: FilterQuery<Job> = {};

    if (userId) {
      filter.userId = userId;
    }

    const jobs = await this.jobModel.find(filter).lean();
    return jobs;
  }

  async getById(id: string) {
    const job = await this.jobModel
      .findOne({
        _id: id,
      })
      .lean();

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return job;
  }

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
