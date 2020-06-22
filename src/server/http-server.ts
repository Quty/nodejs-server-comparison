import { Server as NodeHttpServer, createServer } from 'http';

import { Server } from './server.interface';
import { DataProvider } from '../data-provider';

export class HttpServer implements Server {
  #server: NodeHttpServer;
  #requests: number = 0;

  constructor(dataProvider: DataProvider) {
    this.#server = createServer((_, res) => {
      const response = dataProvider.getData();

      res.setHeader('X-Powered-By', 'node-http');
      res.setHeader('Content-Type',response.contentType);
      res.writeHead(200);
      res.end(response.data);
      this.#requests++;
    });
  }

  get requests() {
    return this.#requests;
  }

  listen (port: number, cb?: (() => void) | undefined) {
    this.#server.listen(port, cb);
  };
}
