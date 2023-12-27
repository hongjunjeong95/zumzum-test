import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservationRepositoryInterfaceToken } from './reservation.repository.interface';
import { Reservation } from '../reservation.entity';
import { ReservationRepository } from './reservation.repository';
import { CustomerRepositoryModule } from 'src/domain/customer/persistence/repository/customer.repository.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), CustomerRepositoryModule],
  providers: [
    {
      provide: ReservationRepositoryInterfaceToken,
      useClass: ReservationRepository,
    },
  ],
  exports: [ReservationRepositoryInterfaceToken],
})
export class ReservationRepositoryModule {}
