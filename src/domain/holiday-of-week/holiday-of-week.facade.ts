import { Injectable } from '@nestjs/common';

import { HolidayOfWeekService } from './service/holiday-of-week.service';
import { CreateHolidayOfWeeksBodyDto } from './dtos/create-many.dto';
import { TourService } from '@domain/tour/service/tour.service';

@Injectable()
export class HolidayOfWeekFacade {
  constructor(
    private readonly holidayOfWeekService: HolidayOfWeekService,
    private readonly tourService: TourService,
  ) {}

  public async createMany(body: CreateHolidayOfWeeksBodyDto): Promise<any> {
    const { tourContentId, weeks } = body;

    const entities = this.holidayOfWeekService.createEntities({
      weeks,
      tourContentId,
    });
    await this.holidayOfWeekService.save(entities);
    await this.tourService.setHolidayByWeeks(weeks);
  }
}
