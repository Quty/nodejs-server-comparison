import { Server as NodeHttpServer, createServer } from 'http';

import { Server } from './server.interface';
import { DataProvider } from './data-provider.interface';

export class HttpServer implements Server {
  #server: NodeHttpServer;
  #requests: number = 0;

  constructor(dataProvider: DataProvider) {
    this.#server = createServer((_, res) => {
      res.setHeader('X-Powered-By', 'node-http');
      res.setHeader('Content-Type', 'application/octet-stream');
      res.writeHead(200);
      res.end(dataProvider.getData());
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
