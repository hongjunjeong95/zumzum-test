import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { HolidayOfWeekService } from './service/holiday-of-week.service';
import { CreateHolidayOfWeeksBodyDto } from './dtos/create-many.dto';
import { TourService } from '@domain/tour/service/tour.service';

@Injectable()
export class HolidayOfWeekFacade {
  constructor(
    private readonly holidayOfWeekService: HolidayOfWeekService,
    private readonly tourService: TourService,
  ) {}

  @Transactional()
  public async createMany(body: CreateHolidayOfWeeksBodyDto): Promise<any> {
    const { tourContentId, weeks } = body;

    await Promise.all([
      this.holidayOfWeekService.createMany({
        weeks,
        tourContentId,
      }),
      this.tourService.setHolidaysOfWeeks(tourContentId, weeks),
    ]);
  }
}
