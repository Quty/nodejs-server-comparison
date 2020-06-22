import fastify from 'fastify';
import { FastifyInstance } from 'fastify';

import { Server } from './server.interface';
import { DataProvider } from '../data-provider';

export class FastifyServer implements Server {
  #app: FastifyInstance;
  #requests: number = 0;

  constructor(dataProvider: DataProvider) {
    this.#app = fastify();
    this.#app.use((_, res) => {
      const response = dataProvider.getData();

      res.setHeader('Content-Type', response.contentType);
      res.setHeader('X-Powered-By', 'fastify');
      res.writeHead(200);
      res.end(response.data);
      this.#requests++;
    });
  }

  get requests() {
    return this.#requests;
  }

  listen (port: number, cb: (() => void) | undefined) {
    this.#app.listen(port, (err) => {
      if (!err && cb) {
        cb();
      }
    });
  };
}
