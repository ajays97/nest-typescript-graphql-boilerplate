import dotenv from 'dotenv-flow';
dotenv.config({ silent: true });

if (process.env.SECRETS && process.env.SECRETS.length) {
  Object.assign(process.env, {
    ...process.env,
    ...JSON.parse(process.env.SECRETS)
  });
}

import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import _config from './config';
import Logger from './common/logger';
import { ConsoleTransport } from './common/logger/transports';
import { AllExceptionsFilter } from './common/filters/allexception.filter';

async function bootstrap() {
  const cfg = _config();
  const logger = Logger.initWinston({
    transports: [ConsoleTransport(cfg.app.appName)]
  });

  const app = await NestFactory.create(AppModule, {
    logger
  });
  app.useGlobalFilters(
    new AllExceptionsFilter(app.get(HttpAdapterHost).httpAdapter)
  );

  if (!cfg.app.port) {
    console.log(
      '\n<---------------------------------------YOU FORGOT TO ADD YOUR ENV FILES!!!--------------------------------------->\n'
    );
    console.log(
      '\n<---------------------------------------YOU FORGOT TO ADD YOUR ENV FILES!!!--------------------------------------->\n'
    );
    console.log(
      '\n<---------------------------------------YOU FORGOT TO ADD YOUR ENV FILES!!!--------------------------------------->\n'
    );
    console.log(
      '\n<---------------------------------------YOU FORGOT TO ADD YOUR ENV FILES!!!--------------------------------------->\n'
    );
    console.log(
      '\n<---------------------------------------YOU FORGOT TO ADD YOUR ENV FILES!!!--------------------------------------->\n\n\n\n\n\n\n'
    );
  }

  await app.listen(cfg.app.port);
  logger.log(`${cfg.app.appName} listening on port ${await app.getUrl()}`);
}
bootstrap();
