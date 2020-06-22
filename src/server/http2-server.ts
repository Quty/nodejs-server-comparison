import { Http2Server as NodeHttp2Server, createServer } from 'http2';

import { Server } from './server.interface';
import { DataProvider } from '../data-provider';

export class Http2Server implements Server {
  #server: NodeHttp2Server;
  #requests: number = 0;

  constructor(dataProvider: DataProvider) {
    this.#server = createServer();
    this.#server.on('stream', (stream) => {
      const response = dataProvider.getData();

      stream.respond({
        ':status': 200,
        'X-Powered-By': 'node-http-2',
        'Content-Type': response.contentType,
      });
      stream.end(response.data);
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
