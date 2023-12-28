import { Module } from '@nestjs/common';

import { ReservationFacade } from './reservation.facade';
import { ReservationServiceModule } from './service/reservation.service.module';
import { SellerReservationController } from './seller.reservation.controller';
import { CustomerReservationController } from './customer.reservation.controller';
import { TourServiceModule } from '@domain/tour/service/tour.service.module';
import { TourContentServiceModule } from '@domain/tour-content/service/tour-content.service.module';

@Module({
  imports: [
    ReservationServiceModule,
    TourServiceModule,
    TourContentServiceModule,
  ],
  controllers: [SellerReservationController, CustomerReservationController],
  providers: [ReservationFacade],
})
export class ReservationModule {}
