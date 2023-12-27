import { Module } from '@nestjs/common';
import { TourContentModule } from './tour-content/tour-content.module';
import { TourModule } from './tour/tour.module';
import { HolidayOfWeekModule } from './holiday-of-week/holiday-of-week.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    TourContentModule,
    TourModule,
    HolidayOfWeekModule,
    ReservationModule,
  ],
})
export class DomainModule {}
