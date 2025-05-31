import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetSession } from '~/session/session.decorator';
import { UserGuard } from './user.guard';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(UserGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get user information',
    description: "Retrieve the current user's information based on session.",
  })
  @Get('info')
  async info(@GetSession('userId') userId: string) {
    const user = await this.userService.getById(userId);

    return {
      isSuccess: true,
      user,
    };
  }
}
