import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class SampleService implements OnModuleInit {
  private readonly _logger = new Logger(SampleService.name);

  constructor() {}

  async onModuleInit(): Promise<void> {
    this._logger.log(`Initializing ${SampleService.name}`);
  }
}
