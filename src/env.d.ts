/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface Env {
  HTTP_PORT: string;
  GRPC_PORT: string;
  DATABASE_PORT: string;
  DATABASE_HOST: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  X_API_KEY: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
