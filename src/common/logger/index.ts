import { Logger as WinstonLogger, LoggerOptions, createLogger } from 'winston';

class Logger {
  // this will set in initWinston method
  private static winston?: WinstonLogger;

  fields: Record<string, any>;
  context?: string;

  constructor(
    private readonly logger: WinstonLogger,
    context?: string,
    fields?: Record<string, any>
  ) {
    this.context = context;
    this.fields = fields || {};
  }

  // class-methods---------------------

  static initWinston(options: LoggerOptions) {
    const winstonLogger = createLogger(options);
    Logger.winston = winstonLogger;
    return this.createInstance();
  }

  static createInstance(context?: string, fields?: Record<string, any>) {
    if (!this.winston)
      throw new Error('Call initWinston before calling this method');
    return new Logger(this.winston, context, fields);
  }

  // member-functions--------------------

  createChild(fields?: Record<string, any>) {
    return new Logger(this.logger, this.context, fields || this.fields);
  }

  log(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.info(msg as string, {
        context,
        ...meta,
        fields: this.fields
      });
    }

    return this.logger.info(message, { context, fields: this.fields });
  }

  error(message: any, trace?: string, context?: string): any {
    context = context || this.context;

    if (message instanceof Error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { message: msg, name, stack, ...meta } = message;

      return this.logger.error(msg, {
        context,
        stack: [trace || message.stack],
        ...meta,
        fields: this.fields
      });
    }

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.error(msg as string, {
        context,
        stack: [trace],
        ...meta,
        fields: this.fields
      });
    }

    return this.logger.error(message, {
      context,
      stack: [trace],
      fields: this.fields
    });
  }

  warn(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.warn(msg as string, {
        context,
        ...meta,
        fields: this.fields
      });
    }

    return this.logger.warn(message, { context, fields: this.fields });
  }

  debug?(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.debug(msg as string, {
        context,
        ...meta,
        fields: this.fields
      });
    }

    return this.logger.debug(message, { context, fields: this.fields });
  }

  verbose?(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.verbose(msg as string, {
        context,
        ...meta,
        fields: this.fields
      });
    }

    return this.logger.verbose(message, { context, fields: this.fields });
  }
}

export default Logger;
