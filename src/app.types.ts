export enum NodeEnv {
  Development = 'development',
  Production = 'production',
}

export interface IEnv {
  NODE_ENV: NodeEnv;
  APP_PORT: number;

  DB_ADMIN_USER: string;
  DB_ADMIN_PASSWORD: string;
  DB_ADMIN_HOST: string;
  DB_ADMIN_PORT: number;
  DB_ADMIN_NAME: string;

  DB_HOT_USER: string;
  DB_HOT_PASSWORD: string;
  DB_HOT_HOST: string;
  DB_HOT_PORT: number;
  DB_HOT_NAME: string;
}

export enum DATABASE {
  ADMIN = 'admin',
  HOT = 'hot',
}
