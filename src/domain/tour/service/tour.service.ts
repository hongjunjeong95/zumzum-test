import { Inject, Injectable, Logger } from '@nestjs/common';

import { Tour, WeekEnum } from '../persistence/tour.entity';
import {
  TourRepositoryInterface,
  TourRepositoryInterfaceToken,
} from '../persistence/repository/tour.repository.interface';
import { DateUtils } from '@helpers/date.utils';
import { CacheService } from '@common/service/cache/cache.service';
import { TooManyDatesToCreateException } from '@common/filters/server-exception';

@Injectable()
export class TourService {
  constructor(
    @Inject(TourRepositoryInterfaceToken)
    private readonly tourRepository: TourRepositoryInterface,

    private readonly cacheService: CacheService,
  ) {}

  private readonly logger = new Logger(Tour.name);

  private async createEntities(param: {
    tourContentId: number;
    timezoneOffset: number;
    localeStartDateString: string;
    localeEndDateString: string;
  }) {
    const { localeEndDateString, timezoneOffset, tourContentId } = param;

    const lastTour = await this.findLastOne(tourContentId);
    const updatedStartLocaleDateString = lastTour
      ? DateUtils.addDateToLocaleDateString(1, lastTour.localeDateString)
      : param.localeStartDateString;

    this.validateMonthDiffToCreateTours(
      new Date(updatedStartLocaleDateString),
      new Date(localeEndDateString),
    );

    return DateUtils.generateDateArray(
      updatedStartLocaleDateString,
      localeEndDateString,
    ).map((localeDateString) => {
      const week = DateUtils.getWeek(localeDateString);
      return Tour.create({
        date: new Date(localeDateString),
        week,
        localeDateString,
        tourContentId,
        timezoneOffset,
      });
    });
  }

  private validateMonthDiffToCreateTours(date1: Date, date2: Date) {
    const monthDiff = DateUtils.getMonthDiff(date1, date2);
    if (monthDiff > 3) {
      throw new TooManyDatesToCreateException(
        '한 번에 생성할 수 있는 투어는 최대 3개월입니다.',
      );
    }
  }

  async createMany(param: {
    tourContentId: number;
    timezoneOffset: number;
    localeStartDateString: string;
    localeEndDateString: string;
  }) {
    const {
      localeStartDateString,
      localeEndDateString,
      timezoneOffset,
      tourContentId,
    } = param;

    return this.tourRepository.customSave(
      await this.createEntities({
        localeEndDateString,
        localeStartDateString,
        timezoneOffset,
        tourContentId,
      }),
    );
  }

  async findLastOne(tourContentId: number): Promise<Tour | null> {
    return this.tourRepository.findLastOne(tourContentId);
  }

  async findOneByIdOrFail(tourId: number): Promise<Tour> {
    return this.tourRepository.findOneByIdOrFail(tourId);
  }

  async findOneByTourContentIdAndLocaleDateStringOrFail(
    tourContentId: number,
    localeDateString: string,
  ): Promise<Tour> {
    return this.tourRepository.findOneByTourContentIdAndLocaleDateStringOrFail(
      tourContentId,
      localeDateString,
    );
  }

  async getAvailableTours(
    tourContentId: number,
    targetMonth: number,
    holidaysOfWeek: WeekEnum[],
  ): Promise<Tour[]> {
    const cacheKey = this.cacheService.generateCacheKeyForHoliday(
      tourContentId,
      targetMonth,
    );

    // Check if data is in cache and not expired
    const cachedResult = this.cacheService.get(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }

    // If not in cache or expired, fetch from the repository
    const result = await this.tourRepository.findAvailableToursInMonth(
      tourContentId,
      targetMonth,
      holidaysOfWeek,
    );

    // Update cache and return the result
    this.cacheService.set(cacheKey, result);
    return result;
  }

  async setSpecificHoliday(
    tourContentId: number,
    localeDateString: string,
  ): Promise<void> {
    const tour = await this.findOneByTourContentIdAndLocaleDateStringOrFail(
      tourContentId,
      localeDateString,
    );
    tour.isHoliday = true;
    await this.tourRepository.customSave(tour);

    // Invalidate the cache
    const targetMonth = new Date(localeDateString).getMonth() + 1;
    const cacheKey = this.cacheService.generateCacheKeyForHoliday(
      tourContentId,
      targetMonth,
    );
    this.cacheService.delete(cacheKey);
  }
}
