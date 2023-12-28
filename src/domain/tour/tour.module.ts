import { Module } from '@nestjs/common';

import { TourFacade } from './tour.facade';
import { TourServiceModule } from './service/tour.module';
import { SellerTourController } from './seller.tour.controller';
import { CustomerTourController } from './customer.tour.controller';

@Module({
  imports: [TourServiceModule],
  controllers: [SellerTourController, CustomerTourController],
  providers: [TourFacade],
})
export class TourModule {}
