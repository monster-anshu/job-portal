import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const CreateJobZod = z.object({
  company: z.string().nonempty(),
  description: z.string().nonempty(),
  name: z.string().nonempty(),
  skills: z.array(z.string()),
});

export class CreateJobDto extends createZodDto(CreateJobZod) {}
