import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Types } from 'mongoose';
import { JobService } from '~/job/job.service';
import {
  JobApplication,
  JobApplicationModelProvider,
} from '~/mongo/job-application.schema';

@Injectable()
export class JobApplicationService {
  constructor(
    @Inject(JobApplicationModelProvider.provide)
    private readonly jobApplicationModel: typeof JobApplicationModelProvider.useValue,
    private readonly jobService: JobService,
  ) {}

  async create(candidateId: string, jobId: string) {
    const job = await this.jobService.getById(jobId);

    const existingApplication = await this.jobApplicationModel
      .findOne({
        jobId: job._id,
        recriuiterId: job.userId,
      })
      .lean();

    if (existingApplication) {
      throw new Error('You have already applied for this job');
    }

    const application = await this.jobApplicationModel.create({
      candidateId: candidateId,
      jobId: job._id,
      recriuiterId: job.userId,
      status: 'PENDING',
    });

    return application.toObject();
  }

  async list(options: ListOptions) {
    const filter: FilterQuery<JobApplication> = {};

    if ('candidateId' in options) {
      filter.candidateId = new Types.ObjectId(options.candidateId);
    }

    if ('recriuiterId' in options) {
      filter.recriuiterId = new Types.ObjectId(options.recriuiterId);
    }

    if ('jobId' in options) {
      filter.jobId = new Types.ObjectId(options.jobId);
    }

    const applications = await this.jobApplicationModel.aggregate<unknown>([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: 'jobs',
          localField: 'jobId',
          foreignField: '_id',
          as: 'job',
        },
      },
      {
        $unwind: '$job',
      },
      {
        $lookup: {
          from: 'users',
          localField: 'recriuiterId',
          foreignField: '_id',
          as: 'recriuiter',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'candidateId',
          foreignField: '_id',
          as: 'candidate',
        },
      },
      {
        $unwind: '$recriuiter',
      },
      {
        $unwind: '$candidate',
      },
      {
        $project: {
          _id: 1,
          status: 1,
          jobId: 1,
          recriuiterId: 1,
          candidateId: 1,
          jobName: '$job.name',
          jobDescription: '$job.description',
          companyName: '$job.company',
          recriuiterName: '$recriuiter.name',
          recriuiterEmail: '$recriuiter.email',
          candidateName: '$candidate.name',
          candidateEmail: '$candidate.email',
        },
      },
    ]);

    return applications;
  }
}

type ListOptions =
  | {
      candidateId: string;
    }
  | {
      recriuiterId: string;
    }
  | {
      jobId: string;
    };
