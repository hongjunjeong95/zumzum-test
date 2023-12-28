import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  private cache: Map<string, any> = new Map();

  set(key: string, value: any, ttl: number = 3600): void {
    this.cache.set(key, value);
    setTimeout(() => this.cache.delete(key), ttl * 1000);
  }

  get(key: string): any {
    return this.cache.get(key);
  }

  delete(key: string): any {
    return this.cache.delete(key);
  }

  generateCacheKeyForHoliday(
    tourContentId: number,
    targetMonth: number,
  ): string {
    return `availableTours_${tourContentId}_${targetMonth}`;
  }
}
