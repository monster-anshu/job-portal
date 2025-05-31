import 'dotenv/config';

export const NODE_ENV = process.env.NODE_ENV;
export const MONGO_DEFAULT_URI = process.env.MONGO_DEFAULT_URI as string;
export const SESSION_JWT_SECRET = process.env.SESSION_JWT_SECRET as string;
