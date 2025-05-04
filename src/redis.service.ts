import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Redis } from 'ioredis';

import { REDIS_CONNECTION_OPTIONS } from './constants/redis.constant';
import { RedisConnectionOptions } from './interfaces/redis.interface';

@Injectable()
export class RedisService implements OnApplicationShutdown {
  private readonly client: Redis;

  constructor(
    @Inject(REDIS_CONNECTION_OPTIONS)
    private readonly options: RedisConnectionOptions,
  ) {
    this.client = new Redis(this.options.url, {
      ...this.options.config,
      maxRetriesPerRequest: this.options.config?.maxRetriesPerRequest ?? null,
    });
  }

  getClient(): Redis {
    return this.client;
  }

  async onApplicationShutdown(): Promise<void> {
    await this.client.quit();
  }
}
