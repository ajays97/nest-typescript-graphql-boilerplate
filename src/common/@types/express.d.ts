import Logger from '../logger';

declare module 'express' {
  export interface Request {
    logger: Logger;
  }
}
