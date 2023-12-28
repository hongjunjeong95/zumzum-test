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

  get(key: string): any {
    return this.cacheManager.get(key);
  }

  set(key: string, value: any, ttl: number = this.cacheConfig.cacheTtl): void {
    this.cacheManager.set(key, value, ttl);
  }

  delete(key: string): any {
    return this.cacheManager.del(key);
  }

  generateCacheKeyForHoliday(
    tourContentId: number,
    targetMonth: number,
  ): string {
    return `availableTours_${tourContentId}_${targetMonth}`;
  }
}
