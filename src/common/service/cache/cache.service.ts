import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import CacheConfig from '@common/config/variables/cache.config';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,

    @Inject(CacheConfig.KEY)
    private readonly cacheConfig: ConfigType<typeof CacheConfig>,
  ) {}

  private readonly logger = new Logger(CacheService.name);

  async get<T>(key: string): Promise<T | null> {
    return this.cacheManager.get<T>(key);
  }

  async set(
    key: string,
    value: any,
    ttl: number = this.cacheConfig.cacheTtl,
  ): Promise<void> {
    this.cacheManager.set(key, value, ttl);
  }

  async delete(key: string): Promise<void> {
    this.cacheManager.del(key);
  }

  async reset(): Promise<void> {
    this.cacheManager.reset();
  }

  generateCacheKeyForHoliday(
    tourContentId: number,
    targetMonth: number,
  ): string {
    return `availableTours_${tourContentId}_${targetMonth}`;
  }
}
