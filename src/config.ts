import * as os from 'os';

function getServer() {
  switch (process.env.SERVER) {
    case 'node-http':
    case 'express':
    case 'fastify':
    case 'koa':
      return process.env.SERVER;
    default:
      return 'node-http';
  }
}

export const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000;
export const SERVER = getServer();
export const WORKERS_COUNT = process.env.WORKERS_COUNT
  ? Number.parseInt(process.env.WORKERS_COUNT)
  : os.cpus().length;
