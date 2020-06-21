import express from 'express';
import { Express } from 'express';

import { Server } from './server.interface';
import { DataProvider } from './data-provider.interface';

export class ExpressServer implements Server {
  #app: Express;
  #requests: number = 0;

  constructor(dataProvider: DataProvider) {
    this.#app = express();
    this.#app.use((_, res) => {
      res.header('Content-Type', 'application/octet-stream');
      res.header('X-Powered-By', 'express');
      res
        .status(200)
        .send(dataProvider.getData());
      this.#requests++;
    });
  }

  get requests() {
    return this.#requests;
  }

  listen (port: number, cb: (() => void) | undefined) {
    this.#app.listen(port, cb);
  };
}
