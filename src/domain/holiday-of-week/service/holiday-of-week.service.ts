import { Inject, Injectable, Logger } from '@nestjs/common';

import { HolidayOfWeek, WeekEnum } from '../persistence/holiday-of-week.entity';
import {
  HolidayOfWeekRepositoryInterface,
  HolidayOfWeekRepositoryInterfaceToken,
} from '../persistence/repository/holiday-of-week.repository.interface';

@Injectable()
export class HolidayOfWeekService {
  constructor(
    @Inject(HolidayOfWeekRepositoryInterfaceToken)
    private readonly holidayOfWeekRepository: HolidayOfWeekRepositoryInterface,
  ) {}

  private readonly logger = new Logger(HolidayOfWeek.name);

  private createEntities(param: { tourContentId: number; weeks: WeekEnum[] }) {
    const { tourContentId, weeks } = param;
    return weeks.map((week) =>
      HolidayOfWeek.create({
        tourContentId,
        week,
      }),
    );
  }

  async createMany(param: { tourContentId: number; weeks: WeekEnum[] }) {
    const { tourContentId, weeks } = param;
    return this.holidayOfWeekRepository.customSave(
      this.createEntities({
        weeks,
        tourContentId,
      }),
    );
  }

  async findMany(tourContentId: number): Promise<HolidayOfWeek[]> {
    return this.holidayOfWeekRepository.findManyByTourContentId(tourContentId);
  }
}
