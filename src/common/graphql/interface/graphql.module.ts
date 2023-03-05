import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core';
import { Request, Response } from 'express';
import { UserType } from 'src/app/sample/graphql/type/user.type';

const parseUserDetails = (headers) => {
  if (!headers || !headers['x-decoded-user']) return null;
  return JSON.parse(headers['x-decoded-user']);
};

const genCtx = ({ req, res }: { req: Request; res: Response }) => {
  const me = parseUserDetails(req.headers);
  return { me, req, res };
};
@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        autoSchemaFile: true,
        playground: true,
        debug: configService.get('app').env !== 'production',
        plugins: [ApolloServerPluginInlineTraceDisabled],
        context: genCtx,
        buildSchemaOptions: {
          orphanedTypes: []
        }
      })
    })
  ]
})
export class GraphqlModule {}
