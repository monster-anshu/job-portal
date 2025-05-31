import mongoose, { Connection } from 'mongoose';
import { MONGO_DEFAULT_URI, NODE_ENV } from '~/env';

const isProd = NODE_ENV === 'production';

mongoose.set('debug', !isProd);
mongoose.set('runValidators', true);
mongoose.set('strict', true);
mongoose.set('autoIndex', !isProd);
mongoose.set('transactionAsyncLocalStorage', true);

const connectionsCache: Record<string, Connection> = {};

const createConnection = (url: string, name: string) => {
  if (connectionsCache[name]) return connectionsCache[name];

  const conn = mongoose.createConnection(url, {});

  conn.on('error', (err) => console.error(`Mongoose (${name}) error:`, err));
  conn.on('disconnected', () =>
    console.warn(`Mongoose (${name}) disconnected`),
  );
  conn.on('connected', () => console.log(`Mongoose (${name}) connected`));

  connectionsCache[name] = conn;
  return conn;
};

export const MONGO_CONNECTION = {
  DEFAULT: createConnection(MONGO_DEFAULT_URI, 'DEFAULT'),
};
