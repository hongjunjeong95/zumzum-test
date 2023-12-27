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

  save(tour: Tour): Promise<Tour>;
  save(tours: Tour[]): Promise<Tour[]>;
  async save(entity: Tour | Tour[]): Promise<Tour | Tour[]> {
    if (Array.isArray(entity)) {
      return this.tourRepository.customSave(entity);
    } else {
      return this.tourRepository.customSave(entity);
    }
  }

  async createEntities(
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

    return DateUtils.getLocaleDateStringRange({
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

  async setHolidaysOfWeeks(tourContentId: number, weeks: WeekEnum[]) {
    const tours =
      await this.tourRepository.findManyBytourContentIdAndInWeeksAndGreaterThanNow(
        tourContentId,
        weeks,
      );

    const entities = tours.map((tour) => {
      tour.isHoliday = true;
      return tour;
    });

    await this.save(entities);
  }

  async findLastOne(tourContentId: number): Promise<Tour | null> {
    return this.tourRepository.findLastOne(tourContentId);
  }
}
