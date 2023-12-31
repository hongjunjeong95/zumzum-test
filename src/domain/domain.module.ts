import { Module } from '@nestjs/common';
import { TourContentModule } from './tour-content/tour-content.module';
import { TourModule } from './tour/tour.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [TourContentModule, TourModule, ReservationModule],
})
export class DomainModule {}
