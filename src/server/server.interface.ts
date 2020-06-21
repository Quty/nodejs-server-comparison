export interface Server {
  listen: (port: number, cb?: () => void) => void;
  requests: number;
}
