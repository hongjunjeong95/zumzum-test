import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TourRepositoryInterfaceToken } from './tour.repository.interface';
import { Tour } from '../tour.entity';
import { TourRepository } from './tour.repository';
import { ReservationRepositoryModule } from '@domain/reservation/persistence/repository/reservation.repository.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tour]), ReservationRepositoryModule],
  providers: [
    {
      provide: TourRepositoryInterfaceToken,
      useClass: TourRepository,
    },
  ],
  exports: [TourRepositoryInterfaceToken],
})
export class TourRepositoryModule {}
