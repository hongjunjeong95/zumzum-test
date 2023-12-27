import { Module } from '@nestjs/common';

import { TourFacade } from './tour.facade';
import { TourServiceModule } from './service/tour.module';
import { TourController } from './tour.controller';
import { HolidayOfWeekServiceModule } from '@domain/holiday-of-week/service/holiday-of-week.module';

@Module({
  imports: [TourServiceModule, HolidayOfWeekServiceModule],
  controllers: [TourController],
  providers: [TourFacade],
})
export class TourModule {}
