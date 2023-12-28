import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { ConfigType } from '@nestjs/config';
import redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';

import { CacheService } from './cache.service';
import CacheConfig from '@common/config/variables/cache.config';

@Module({
  imports: [
    NestCacheModule.registerAsync<RedisClientOptions>({
      useFactory: async (config: ConfigType<typeof CacheConfig>) => ({
        store: redisStore,
        ttl: config.cacheTtl,
        max: config.max,
        url: config.url,
        isGlobal: true,
      }),
      inject: [CacheConfig.KEY],
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
