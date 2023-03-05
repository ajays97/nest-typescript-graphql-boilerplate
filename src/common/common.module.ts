import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphqlModule } from './graphql/interface/graphql.module';
import { MongoModule } from './mongo/mongo.module';
import { PostgresModule } from './postgres/postgres.module';

@Global()
@Module({
  imports: [
    ConfigModule,
    GraphqlModule
    // MongoModule
    // PostgresModule
  ],
  exports: [
    ConfigModule,
    GraphqlModule
    // MongoModule
    // PostgresModule
  ]
})
export class CommonModule {}
