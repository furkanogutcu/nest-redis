# nest-redis

[![npm version](https://img.shields.io/npm/v/@furkanogutcu/nest-redis.svg)](https://www.npmjs.com/package/@furkanogutcu/nest-redis)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Redis connection and client management module for NestJS applications. This package provides an easy way to integrate Redis with your NestJS application.

## Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Development](#development)
- [License](#license)

## Installation

```bash
npm install @furkanogutcu/nest-redis
```

or

```bash
yarn add @furkanogutcu/nest-redis
```

## Features

- Simple Redis client integration for NestJS applications
- Support for both synchronous and asynchronous configuration
- Automatic connection management (including graceful shutdown)
- Minimal setup required with full access to Redis functionality
- Built on top of the widely-used `ioredis` package

## Usage

### Basic Example

```typescript
import { Module } from '@nestjs/common';
import { RedisModule } from '@furkanogutcu/nest-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    RedisModule.register({
      connection: {
        url: 'redis://localhost:6379',
        config: {
          // Optional ioredis configuration
        },
      },
      // Optional: Make the module global
      // isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Async Configuration

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@furkanogutcu/nest-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          url: configService.get('REDIS_URL'),
          config: {
            // Optional ioredis configuration
          },
        },
      }),
      // Optional: Make the module global
      // isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Using the Redis service

```typescript
import { Injectable } from '@nestjs/common';
import { RedisService } from '@furkanogutcu/nest-redis';

@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}

  async setValue(key: string, value: string): Promise<string> {
    const client = this.redisService.getClient();

    return client.set(key, value);
  }

  async getValue(key: string): Promise<string> {
    const client = this.redisService.getClient();

    return client.get(key);
  }
}
```

## Development

### Requirements

- Node.js 18+
- npm or yarn

### Getting Started

Clone the project

```bash
  git clone https://github.com/furkanogutcu/nest-redis.git
```

Go to the project directory

```bash
  cd nest-redis
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev
```

## License

This project is licensed under the [MIT License](LICENSE).
