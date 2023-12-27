import { Injectable } from '@nestjs/common';

import { TourService } from './service/tour.service';
import { CreateToursBodyDto } from './dtos/create-many.dto';
import { HolidayOfWeekService } from '@domain/holiday-of-week/service/holiday-of-week.service';
import { SetSpecificHolidayBodyDto } from './dtos/set-specific-holiday.dto';
import { FindToursQueryDto } from './dtos/find-many.dto';
import { Tour } from './persistence/tour.entity';

@Injectable()
export class TourFacade {
  constructor(
    private readonly tourService: TourService,
    private readonly holidayOfWeekService: HolidayOfWeekService,
  ) {}

  public async createMany(body: CreateToursBodyDto): Promise<any> {
    const {
      tourContentId,
      timezoneOffset,
      localeStartDateString,
      localeEndDateString,
    } = body;

    const holidayWeeks = (
      await this.holidayOfWeekService.findMany(tourContentId)
    ).map((holidayOfWeek) => holidayOfWeek.week);

    await this.tourService.save(
      await this.tourService.createEntities(holidayWeeks, {
        localeEndDateString,
        localeStartDateString,
        timezoneOffset,
        tourContentId,
      }),
    );
  }

  public async setSpecificHoliday(
    body: SetSpecificHolidayBodyDto,
  ): Promise<any> {
    const tour =
      await this.tourService.findOneByTourContentIdAndLocaleDateStringOrFail(
        body.tourContentId,
        body.localeDateString,
      );
    tour.isHoliday = true;
    await this.tourService.save(tour);
  }

  public async getAvailableTours(query: FindToursQueryDto): Promise<Tour[]> {
    return this.tourService.getAvailableTours(
      query.tourContentId,
      query.targetMonth,
    );
  }
}
