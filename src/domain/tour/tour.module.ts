import { Module } from '@nestjs/common';

import { TourFacade } from './tour.facade';
import { TourServiceModule } from './service/tour.module';
import { SellerTourController } from './seller.tour.controller';
import { HolidayOfWeekServiceModule } from '@domain/holiday-of-week/service/holiday-of-week.module';
import { CustomerTourController } from './customer.tour.controller';

@Module({
  imports: [TourServiceModule, HolidayOfWeekServiceModule],
  controllers: [SellerTourController, CustomerTourController],
  providers: [TourFacade],
})
export class TourModule {}
