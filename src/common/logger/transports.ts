import winston from 'winston';

export const FileTransport = (appName: string) => {
  return new winston.transports.File({
    format: winston.format.combine(
      winston.format((info) => {
        info.appName = appName;
        return info;
      })(),
      winston.format.timestamp(),
      winston.format.ms(),
      winston.format.json()
    ),
    filename: 'out.log'
  });
};

export const ConsoleTransport = (appName: string) =>
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format((info) => {
        info.appName = appName;
        return info;
      })(),
      winston.format.timestamp(),
      winston.format.ms(),
      winston.format.json(),
      winston.format.colorize()
    )
  });
