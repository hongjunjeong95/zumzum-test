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

    const lastTour = await this.tourRepository.findLastOne(tourContentId);
    const updatedLocaleStartDateString = lastTour
      ? DateUtils.addDateToLocaleDateString(1, lastTour.localeDateString)
      : param.localeStartDateString;

    if (
      this.isOverMonthDiffAvailableCancelDays(
        new Date(updatedLocaleStartDateString),
        new Date(localeEndDateString),
      )
    ) {
      throw new TooManyDatesToCreateException(
        '한 번에 생성할 수 있는 투어는 최대 3개월입니다.',
      );
    }

    return DateUtils.generateDateArray(
      updatedLocaleStartDateString,
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

  private isOverMonthDiffAvailableCancelDays(
    date1: Date,
    date2: Date,
  ): boolean {
    const availableCancelDays = 3;
    return DateUtils.getMonthDiff(date1, date2) > availableCancelDays;
  }

  async createMany(param: {
    tourContentId: number;
    timezoneOffset: number;
    localeStartDateString: string;
    localeEndDateString: string;
  }): Promise<Tour[]> {
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

  async findOneByIdOrFail(tourId: number): Promise<Tour> {
    return this.tourRepository.findOneByIdOrFail(tourId);
  }

  async getAvailableTours(
    tourContentId: number,
    targetMonth: number,
    holidaysOfWeek: WeekEnum[] | null,
  ): Promise<Tour[]> {
    const cacheKey = this.cacheService.generateCacheKeyForHoliday(
      tourContentId,
      targetMonth,
    );
    const cachedResult = await this.cacheService.get<Tour[]>(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }

    const result = await this.tourRepository.findAvailableToursInMonth(
      tourContentId,
      targetMonth,
      holidaysOfWeek,
    );

    if (result.length > 0) {
      this.cacheService.set(cacheKey, result);
    }

    return result;
  }

  async setSpecificHoliday(
    tourContentId: number,
    localeDateString: string,
  ): Promise<void> {
    const tour =
      await this.tourRepository.findOneByTourContentIdAndLocaleDateStringOrFail(
        tourContentId,
        localeDateString,
      );
    tour.isHoliday = true;
    await this.tourRepository.customSave(tour);

    const targetMonth = new Date(localeDateString).getMonth() + 1;
    const cacheKey = this.cacheService.generateCacheKeyForHoliday(
      tourContentId,
      targetMonth,
    );
    await this.cacheService.delete(cacheKey);
  }
}
