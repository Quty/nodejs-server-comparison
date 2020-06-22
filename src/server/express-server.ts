import express from 'express';
import { Express } from 'express';

import { Server } from './server.interface';
import { DataProvider } from '../data-provider';

export class ExpressServer implements Server {
  #app: Express;
  #requests: number = 0;

  constructor(dataProvider: DataProvider) {
    this.#app = express();
    this.#app.use((_, res) => {
      const response = dataProvider.getData();

      res.header('Content-Type', response.contentType);
      res.header('X-Powered-By', 'express');
      res
        .status(200)
        .send(response.data);
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
