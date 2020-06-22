import { RandomBytesProvider } from './data-provider/random-bytes-provider';
import { Server, HttpServer, ExpressServer, FastifyServer } from './server';
import { PORT, SERVER } from './config';

const dataProvider = new RandomBytesProvider({ dataLength: 1024 });

let server: Server;

switch (SERVER) {
  case 'express':
    server = new ExpressServer(dataProvider);
    break;
  case 'fastify':
    server = new FastifyServer(dataProvider);
    break;
  case 'node-http':
    server = new HttpServer(dataProvider);
    break;
}

server.listen(PORT, () => {
  console.log(`Process ${process.pid} listening on ${PORT} with ${SERVER}`);
});

const exit = () => {
  console.log(`Process ${process.pid} finished his work with ${server.requests} requests handled`);
  process.exit();
}

process.on('SIGTERM', exit);
process.on('SIGINT', exit);
