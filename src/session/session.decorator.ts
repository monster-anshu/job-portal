import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { CookieOptions, Request, Response } from 'express';
import { UserSession } from '~/lib/jwt';

export type SetCookie = (
  name: string,
  value: string,
  options: CookieOptions,
) => void;

export const GetSession = createParamDecorator(
  (key: keyof UserSession, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.session?.[key];
  },
);

export const SetCookie = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): SetCookie => {
    const response = ctx.switchToHttp().getResponse<Response>();
    return (...args) => response.cookie(...args);
  },
);
