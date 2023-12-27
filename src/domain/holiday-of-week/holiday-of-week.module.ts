import { Module } from '@nestjs/common';

import { HolidayOfWeekFacade } from './holiday-of-week.facade';
import { HolidayOfWeekServiceModule } from './service/holiday-of-week.module';
import { HolidayOfWeekController } from './holiday-of-week.controller';
import { TourServiceModule } from '@domain/tour/service/tour.module';

@Module({
  imports: [HolidayOfWeekServiceModule, TourServiceModule],
  controllers: [HolidayOfWeekController],
  providers: [HolidayOfWeekFacade],
})
export class HolidayOfWeekModule {}
