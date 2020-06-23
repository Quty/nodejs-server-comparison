import { SERVER } from './config';
import { DataProvider } from './data-provider';
import { Server, HttpServer, ExpressServer, FastifyServer, KoaServer } from './server';

export class ServerFactory {
  constructor(
    private readonly serverFramework: typeof SERVER,
    private readonly dataProvider: DataProvider,
  ) {}

  createServer(): Server {
    switch (this.serverFramework) {
      case 'express': return new ExpressServer(this.dataProvider);
      case 'fastify': return new FastifyServer(this.dataProvider);
      case 'node-http': return new HttpServer(this.dataProvider);
      case 'koa': return new KoaServer(this.dataProvider);
    }
  }
}
