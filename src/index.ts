import { RandomBytesProvider } from './data-provider/random-bytes-provider';
import { ServerFactory } from './server-factory';
import { PORT, SERVER } from './config';

const dataProvider = new RandomBytesProvider({ dataLength: 1024 });
const serverFactory = new ServerFactory(SERVER, dataProvider);

const server = serverFactory.createServer();

server.listen(PORT, () => {
  console.log(`Process ${process.pid} listening on ${PORT} with ${SERVER}`);
});

const exit = () => {
  console.log(`Process ${process.pid} finished his work with ${server.requests} requests handled`);
  process.exit();
}

process.on('SIGTERM', exit);
process.on('SIGINT', exit);
