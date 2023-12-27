import { Module } from '@nestjs/common';
import { ReservationRepositoryModule } from '../persistence/repository/reservation.repository.module';
import { ReservationService } from './reservation.service';
import { ReservationRepository } from '../persistence/repository/reservation.repository';

@Module({
  imports: [ReservationRepositoryModule],
  providers: [ReservationService, ReservationRepository],
  exports: [ReservationService],
})
export class ReservationServiceModule {}
