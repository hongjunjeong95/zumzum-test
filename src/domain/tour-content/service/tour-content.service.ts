import { Inject, Injectable, Logger } from '@nestjs/common';

import { TourContent } from '../persistence/tour-content.entity';
import {
  TourContentRepositoryInterface,
  TourContentRepositoryInterfaceToken,
} from '../persistence/repository/tour-content.repository.interface';
import { WeekEnum } from '@domain/tour/persistence/tour.entity';
import { CacheService } from '@common/service/cache/cache.service';

@Injectable()
export class TourContentService {
  constructor(
    @Inject(TourContentRepositoryInterfaceToken)
    private readonly tourContentRepository: TourContentRepositoryInterface,

    private readonly cacheService: CacheService,
  ) {}

  private readonly logger = new Logger(TourContent.name);

  async create(content: string, sellerId: number): Promise<TourContent> {
    return this.tourContentRepository.customSave(
      TourContent.create({
        content,
        sellerId,
      }),
    );
  }

  async findOneByIdOrFail(tourContentId: number): Promise<TourContent> {
    return this.tourContentRepository.findOneByIdOrFail(tourContentId);
  }

  async setHolidaysOfWeek(
    tourContentId: number,
    weeks: WeekEnum[],
  ): Promise<void> {
    const tourContent = await this.tourContentRepository.findOneByIdOrFail(
      tourContentId,
    );
    tourContent.holidaysOfWeek = weeks;
    await this.tourContentRepository.customSave(tourContent);
    await this.fflushCacheByTourContentId(tourContentId);
  }

  private async fflushCacheByTourContentId(
    tourContentId: number,
  ): Promise<void> {
    const monthArray = Array.from({ length: 12 }, (_, index) => index + 1);
    monthArray.forEach((month) => {
      const cacheKey = this.cacheService.generateCacheKeyForHoliday(
        tourContentId,
        month,
      );
      this.cacheService.delete(cacheKey);
    });
  }
}
