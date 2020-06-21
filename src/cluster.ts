import * as cluster from 'cluster';
import * as os from 'os';

import { ResponseDataProvider } from './response-data-provider';
import { Server, HttpServer, ExpressServer, FastifyServer } from './server';
import { PORT, SERVER } from './config';

const CPUS_COUNT = os.cpus().length;

if (cluster.isMaster) {
  const workers: cluster.Worker[] = [];

  console.log(`Master pid is ${process.pid}`);

  const exit = () => {
    workers.forEach((worker) => worker.kill());
    process.exit();
  }

  process.on('SIGTERM', exit);
  process.on('SIGINT', exit);

  process.on('exit', () => {
    console.log('Master finished his work');
  });

  for (let i = 0; i < CPUS_COUNT; i++) {
    workers.push(cluster.fork());
  }
} else {
  const dataProvider = new ResponseDataProvider({ dataLength: 1024 });

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
    console.log(`Worker ${cluster.worker.process.pid} listening on ${PORT} with ${SERVER}`);
  });

  const exit = () => {
    console.log(`Worker ${cluster.worker.process.pid} finished his work with ${server.requests} requests handled`);
    process.exit();
  }

  process.on('SIGTERM', exit);
  process.on('SIGINT', exit);
}
