import { ContextType, HttpException, HttpStatus } from '@nestjs/common';
import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { MESSAGES } from '@nestjs/core/constants';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { IGraphqlContext } from '../graphql/interface/context.interface';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const type = host.getType<ContextType | 'graphql'>();

    switch (type) {
      case 'graphql':
        return this.catchGraphql(exception, host);
      case 'http':
        return this.catchHttp(exception, host);
    }
  }

  catchGraphql(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const { req } = gqlHost.getContext<IGraphqlContext>();
    const info = gqlHost.getInfo();
    if (!req.logger) return;
    req.logger.fields['operationName'] = info?.fieldName;
    req.logger.error(exception, undefined, 'GRAPHQL');
  }

  catchHttp(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    if (!req.logger) return super.catch(exception, host);
    req.logger.error(exception, undefined, 'HTTP');

    if (exception instanceof HttpException) return super.catch(exception, host);
    const body = this.isHttpError(exception)
      ? {
          statusCode: exception.statusCode,
          message: exception.message
        }
      : {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: MESSAGES.UNKNOWN_EXCEPTION_MESSAGE
        };
    res.status(body.statusCode).json(body);
  }
}
