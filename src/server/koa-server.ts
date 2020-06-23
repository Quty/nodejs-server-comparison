import express from 'express';
import { Express } from 'express';

import Koa from 'koa';

import { Server } from './server.interface';
import { DataProvider } from '../data-provider';

export class KoaServer implements Server {
  #app: Koa;
  #requests: number = 0;

  constructor(dataProvider: DataProvider) {
    this.#app = new Koa();
    this.#app.use((ctx) => {
      const response = dataProvider.getData();

      ctx.set('Content-Type', response.contentType);
      ctx.set('X-Powered-By', 'koa');
      ctx.body = response.data;
      ctx.status = 200;

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
