import { ModuleMetadata } from '@nestjs/common';
import { RedisOptions } from 'ioredis';

export interface RedisConnectionOptions {
  url: string;
  config?: Omit<RedisOptions, 'url'>;
}

export interface RedisModuleOptions {
  connection: RedisConnectionOptions;
  isGlobal?: boolean;
}

export interface RedisModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useFactory: (...args: any[]) => Promise<RedisModuleOptions> | RedisModuleOptions;
  isGlobal?: boolean;
}
