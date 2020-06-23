import * as cluster from 'cluster';

import { RandomBytesProvider } from './data-provider/random-bytes-provider';
import { ServerFactory } from './server-factory';
import { PORT, SERVER, WORKERS_COUNT } from './config';

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

  for (let i = 0; i < WORKERS_COUNT; i++) {
    workers.push(cluster.fork());
  }
} else {
  const dataProvider = new RandomBytesProvider({ dataLength: 1024 });
  const serverFactory = new ServerFactory(SERVER, dataProvider);

  const server = serverFactory.createServer();

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
