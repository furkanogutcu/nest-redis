import { DynamicModule, Module, Provider } from '@nestjs/common';

import { REDIS_CONNECTION_OPTIONS } from './constants/redis.constants';
import { RedisModuleAsyncOptions, RedisModuleOptions } from './interfaces/redis.interfaces';
import { RedisService } from './redis.service';

@Module({})
export class RedisModule {
  static register(options: RedisModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: REDIS_CONNECTION_OPTIONS,
          useValue: options.connection,
        },
        RedisService,
      ],
      exports: [RedisService],
    };
  }

  static registerAsync(options: RedisModuleAsyncOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options), RedisService],
      exports: [RedisService],
    };
  }

  private static createAsyncProviders(options: RedisModuleAsyncOptions): Provider[] {
    return [
      {
        provide: REDIS_CONNECTION_OPTIONS,
        useFactory: async (...args: any[]) => {
          const moduleOptions = await options.useFactory(...args);

          return moduleOptions.connection;
        },
        inject: options.inject || [],
      },
    ];
  }
}
