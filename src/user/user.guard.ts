import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { UserService } from './user.service';
import { Reflector } from '@nestjs/core';
import { CHECK_ABILITY, PermissionKey } from './ability.decorator';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}

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

    const permissionKeys = (this.reflector.get(
      CHECK_ABILITY,
      context.getHandler(),
    ) || []) as PermissionKey[];

    for (const permissionKey of permissionKeys) {
      const permission = user.access.includes(permissionKey);
      if (!permission) {
        throw new ForbiddenException();
      }
    }

    return true;
  }
}
