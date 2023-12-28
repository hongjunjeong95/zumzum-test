import { Module } from '@nestjs/common';

import { HolidayOfWeekFacade } from './holiday-of-week.facade';
import { HolidayOfWeekServiceModule } from './service/holiday-of-week.module';
import { SellerHolidayOfWeekController } from './seller.holiday-of-week.controller';
import { TourServiceModule } from '@domain/tour/service/tour.module';

@Module({
  imports: [HolidayOfWeekServiceModule, TourServiceModule],
  controllers: [SellerHolidayOfWeekController],
  providers: [HolidayOfWeekFacade],
})
export class HolidayOfWeekModule {}
