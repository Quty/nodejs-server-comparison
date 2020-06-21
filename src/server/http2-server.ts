import { Http2Server as NodeHttp2Server, createServer } from 'http2';

import { Server } from './server.interface';
import { DataProvider } from './data-provider.interface';

export class Http2Server implements Server {
  #server: NodeHttp2Server;
  #requests: number = 0;

  constructor(dataProvider: DataProvider) {
    // this.#server = createServer((_, res) => {
    //   res.setHeader('X-Powered-By', 'node-http-2');
    //   res.setHeader('Content-Type', 'application/octet-stream');
    //   res.writeHead(200);
    //   res.end(dataProvider.getData());
    //   this.#requests++;
    // });
    this.#server = createServer();
    this.#server.on('stream', (stream) => {
      stream.respond({
        ':status': 200,
        'X-Powered-By': 'node-http-2',
        'Content-Type': 'application/octet-stream',
      });
      stream.end(dataProvider.getData());
      this.#requests++;
    });
  }

  get requests() {
    return this.#requests;
  }

  listen (port: number, cb: (() => void) | undefined) {
    this.#server.listen(port, cb);
  };
}
