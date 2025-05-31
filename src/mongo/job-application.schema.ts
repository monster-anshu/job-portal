import { InferSchemaType, Schema } from 'mongoose';
import { MONGO_CONNECTION } from './connections';
import { Provider } from '@nestjs/common';

const JOB_APPLICATION_STATUS = ['PENDING', 'SELECTED', 'REJECTED'] as const;

const JobApplicationSchema = new Schema(
  {
    candidateId: {
      required: true,
      type: Schema.Types.ObjectId,
    },
    jobId: {
      required: true,
      type: Schema.Types.ObjectId,
    },
    recriuiterId: {
      required: true,
      type: Schema.Types.ObjectId,
    },
    status: {
      enum: JOB_APPLICATION_STATUS,
      required: true,
      type: String,
    },
  },
  { timestamps: true },
);

export const JobApplicationModelProvider = {
  provide: 'job-application-model',
  useValue: MONGO_CONNECTION.DEFAULT.model(
    'job_application',
    JobApplicationSchema,
  ),
} satisfies Provider;

export type JobApplication = InferSchemaType<typeof JobApplicationSchema>;
