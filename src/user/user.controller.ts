import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetSession } from '~/session/session.decorator';
import { UserGuard } from './user.guard';

@UseGuards(UserGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  async info(@GetSession('userId') userId: string) {
    const user = await this.userService.getById(userId);

    return {
      isSuccess: true,
      user,
    };
  }
}
