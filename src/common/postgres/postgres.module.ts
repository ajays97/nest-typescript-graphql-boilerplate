import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { host, port, username, password, dbName } =
          configService.get('db.postgres');
        return {
          type: 'postgres',
          port,
          host,
          username,
          password,
          database: dbName,
          autoLoadEntities: true,
          // TODO - is synchronize true is okay?
          synchronize: true
        };
      }
    })
  ]
})
export class PostgresModule {}
