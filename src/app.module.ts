import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { SampleModule } from './app/sample/sample.module';
import { ConfigModule } from '@nestjs/config';
import _config from './config';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    CommonModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [_config]
    }),
    HealthModule,
    SampleModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
