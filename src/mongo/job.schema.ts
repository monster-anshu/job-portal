import { InferSchemaType, Schema } from 'mongoose';
import { MONGO_CONNECTION } from './connections';
import { Provider } from '@nestjs/common';

const JobSchema = new Schema(
  {
    company: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    skills: [String],
    userId: {
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true },
);

export const JobModelProvider = {
  provide: 'job-model',
  useValue: MONGO_CONNECTION.DEFAULT.model('job', JobSchema),
} satisfies Provider;

export type Job = InferSchemaType<typeof JobSchema>;
