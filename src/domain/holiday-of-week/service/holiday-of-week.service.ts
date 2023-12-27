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

  save(holidaysOfWeek: HolidayOfWeek): Promise<HolidayOfWeek>;
  save(holidaysOfWeek: HolidayOfWeek[]): Promise<HolidayOfWeek[]>;
  async save(
    entity: HolidayOfWeek | HolidayOfWeek[],
  ): Promise<HolidayOfWeek | HolidayOfWeek[]> {
    if (Array.isArray(entity)) {
      return this.holidayOfWeekRepository.customSave(entity);
    } else {
      return this.holidayOfWeekRepository.customSave(entity);
    }
  }

  createEntities(param: { tourContentId: number; weeks: WeekEnum[] }) {
    const { tourContentId, weeks } = param;
    return weeks.map((week) =>
      HolidayOfWeek.create({
        tourContentId,
        week,
      }),
    );
  }
}
