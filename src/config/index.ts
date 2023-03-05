const config = () => {
  const APP_NAME = 'nest-typescript-graphql-boilerplate';
  const NODE_ENV: string = process.env.NODE_ENV;
  const PORT: string = process.env.PORT;

  return {
    app: {
      appName: APP_NAME,
      env: NODE_ENV,
      port: <number>Number(PORT)
    },
    db: {
      mongo: {
        uri: process.env.MONGO_URI,
        dbName: process.env.MONGO_DB_NAME
      },
      postgres: {
        host: <string>process.env.POSTGRES_HOST,
        port: <number>Number(process.env.POSTGRES_PORT),
        username: <string>process.env.POSTGRES_USERNAME,
        password: <string>process.env.POSTGRES_PASSWORD,
        dbName: <string>process.env.POSTGRES_DB_NAME
      },
      redis: {
        url: process.env.REDIS_URI,
        database: process.env.REDIS_DB
      }
    }
  } as const;
};

export type ConfigVariablesType = ReturnType<typeof config>;

export default config;
