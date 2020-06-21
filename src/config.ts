function getServer() {
  switch (process.env.SERVER) {
    case 'node-http':
    case 'express':
    case 'fastify':
      return process.env.SERVER;
    default:
      return 'node-http';
  }
}

export const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000;
export const SERVER = getServer();
