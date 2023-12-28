import { Module } from '@nestjs/common';

import { TourFacade } from './tour.facade';
import { TourServiceModule } from './service/tour.service.module';
import { SellerTourController } from './seller.tour.controller';
import { CustomerTourController } from './customer.tour.controller';
import { TourContentServiceModule } from '@domain/tour-content/service/tour-content.service.module';

@Module({
  imports: [TourServiceModule, TourContentServiceModule],
  controllers: [SellerTourController, CustomerTourController],
  providers: [TourFacade],
})
export class TourModule {}
