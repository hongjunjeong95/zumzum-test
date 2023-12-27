import { Module } from '@nestjs/common';

import { ReservationFacade } from './reservation.facade';
import { ReservationServiceModule } from './service/reservation.module';
import { SellerReservationController } from './seller.reservation.controller';
import { CustomerReservationController } from './customer.reservation.controller';
import { TourServiceModule } from '@domain/tour/service/tour.module';

@Module({
  imports: [ReservationServiceModule, TourServiceModule],
  controllers: [SellerReservationController, CustomerReservationController],
  providers: [ReservationFacade],
})
export class ReservationModule {}
