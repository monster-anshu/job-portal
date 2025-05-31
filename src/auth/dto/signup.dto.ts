import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { USER_TYPE } from '~/mongo/user.schema';

const SignUpZod = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().nonempty(),
  type: z.enum(USER_TYPE),
});

export class SignUpDto extends createZodDto(SignUpZod) {}
