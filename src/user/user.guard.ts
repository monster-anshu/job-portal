import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { UserService } from './user.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const session = request.session;

    if (!session || !session.userId) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.getById(session.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
