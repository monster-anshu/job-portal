import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const SignInZod = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});

export class SignInDto extends createZodDto(SignInZod) {}
