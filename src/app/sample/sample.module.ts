import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SampleResolver } from './graphql/sample.resolver';
import { SampleService } from './sample.service';

@Module({
  imports: [ConfigModule],
  providers: [SampleService, SampleResolver]
})
export class SampleModule {}
