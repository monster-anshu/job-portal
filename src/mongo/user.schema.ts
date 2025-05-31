import { Provider } from '@nestjs/common';
import { InferSchemaType, Schema } from 'mongoose';
import { MONGO_CONNECTION } from './connections';

export const USER_TYPE = ['CANDIDATE', 'RECRIUITER'] as const;

const UserSchema = new Schema(
  {
    email: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    access: [{ type: String, enum: USER_TYPE }],
  },
  {
    timestamps: true,
  },
);

export const UserModelProvider = {
  provide: 'user-model',
  useValue: MONGO_CONNECTION.DEFAULT.model('user', UserSchema),
} satisfies Provider;

export type User = InferSchemaType<typeof UserSchema>;
