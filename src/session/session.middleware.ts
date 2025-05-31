import type { RequestHandler } from 'express';
import { UserSession, verifyJwt } from '~/lib/jwt';

declare global {
  namespace Express {
    export interface Request {
      session?: UserSession | null;
    }
  }
}

export const SessionMiddlewareFn: RequestHandler = async (req, res, next) => {
  const token: string | undefined = req.cookies?.['__session'];
  if (!token) {
    next();
    return;
  }
  const session = await verifyJwt(token);
  req.session = session;
  next();
};
