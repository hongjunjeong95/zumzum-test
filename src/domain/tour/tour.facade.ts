import { Injectable } from '@nestjs/common';

import { TourService } from './service/tour.service';
import { CreateToursBodyDto } from './dtos/create-many.dto';
import { HolidayOfWeekService } from '@domain/holiday-of-week/service/holiday-of-week.service';

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
}
