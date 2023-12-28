import { Inject, Injectable, Logger } from '@nestjs/common';

import { Tour } from '../persistence/tour.entity';
import {
  TourRepositoryInterface,
  TourRepositoryInterfaceToken,
} from '../persistence/repository/tour.repository.interface';
import { DateUtils } from '@helpers/date.utils';
import { WeekEnum } from '@domain/holiday-of-week/persistence/holiday-of-week.entity';

@Injectable()
export class TourService {
  constructor(
    @Inject(TourRepositoryInterfaceToken)
    private readonly tourRepository: TourRepositoryInterface,
  ) {}

  private readonly logger = new Logger(Tour.name);

  private async createEntities(
    holidayWeeks: WeekEnum[],
    param: {
      tourContentId: number;
      timezoneOffset: number;
      localeStartDateString: string;
      localeEndDateString: string;
    },
  ) {
    const { localeEndDateString, timezoneOffset, tourContentId } = param;

    const lastTour = await this.findLastOne(tourContentId);
    const updatedStartLocaleDateString = lastTour
      ? DateUtils.addDateToLocaleDateString(1, lastTour.localeDateString)
      : param.localeStartDateString;

    return DateUtils.generateDateArray({
      localeStartDateString: updatedStartLocaleDateString,
      localeEndDateString,
    }).map((localeDateString) => {
      const week = DateUtils.getWeek(localeDateString);
      return Tour.create({
        isHoliday: holidayWeeks.includes(week),
        date: new Date(localeDateString),
        week,
        localeDateString,
        tourContentId,
        timezoneOffset,
      });
    });
  }

  async createMany(
    holidayWeeks: WeekEnum[],
    param: {
      tourContentId: number;
      timezoneOffset: number;
      localeStartDateString: string;
      localeEndDateString: string;
    },
  ) {
    const {
      localeStartDateString,
      localeEndDateString,
      timezoneOffset,
      tourContentId,
    } = param;

    return this.tourRepository.customSave(
      await this.createEntities(holidayWeeks, {
        localeEndDateString,
        localeStartDateString,
        timezoneOffset,
        tourContentId,
      }),
    );
  }

  async setHolidaysOfWeeks(
    tourContentId: number,
    weeks: WeekEnum[],
  ): Promise<void> {
    const tours =
      await this.tourRepository.findManyBytourContentIdAndInWeeksAndGreaterThanNow(
        tourContentId,
        weeks,
      );

    const entities = tours.map((tour) => {
      tour.isHoliday = true;
      return tour;
    });

    await this.tourRepository.customSave(entities);
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
  ): Promise<Tour[]> {
    return this.tourRepository.findAvailableToursInMonth(
      tourContentId,
      targetMonth,
    );
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
  }
}
