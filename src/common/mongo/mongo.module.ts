import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get('db').mongo.uri}/${
          configService.get('db').mongo.dbName
        }`,
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    })
  ]
})
export class MongoModule {}
