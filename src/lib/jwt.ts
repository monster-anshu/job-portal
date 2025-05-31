import { sign, verify } from 'jsonwebtoken';
import { SESSION_JWT_SECRET } from '~/env';
import { User } from '~/mongo/user.schema';

if (!SESSION_JWT_SECRET) {
  throw new Error('SESSION_JWT_SECRET is not defined');
}

export type UserSession = {
  userId: string;
  access: User['access'];
};

export const signJwt = (
  data: UserSession,
  options: { expiresIn?: number } = {},
) => {
  const { expiresIn } = options;
  return sign(
    {
      data,
    },
    SESSION_JWT_SECRET,
    { expiresIn: expiresIn || 90 * 24 * 60 * 60 },
  );
};

export const verifyJwt = (token: string): Promise<UserSession | null> => {
  return new Promise((resolve) => {
    if (!token) {
      return resolve(null);
    }
    verify(token, SESSION_JWT_SECRET, (_err, decoded) => {
      if (typeof decoded !== 'object' || !('data' in decoded)) {
        return resolve(null);
      }
      const payload = decoded?.data as UserSession | null;
      if (!payload) {
        return resolve(null);
      }
      resolve(payload);
    });
  });
};
