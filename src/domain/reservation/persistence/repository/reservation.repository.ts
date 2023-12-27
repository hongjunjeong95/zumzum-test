import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ReservationRepositoryInterface } from './reservation.repository.interface';
import { Reservation } from '../reservation.entity';

@Injectable()
export class ReservationRepository
  extends Repository<Reservation>
  implements ReservationRepositoryInterface
{
  constructor(private dataSource: DataSource) {
    super(Reservation, dataSource.createEntityManager());
  }

  protected readonly logger = new Logger(ReservationRepository.name);
  protected readonly ENTITY_NAME = Reservation.name;
  protected readonly entity = Reservation;

  findByIdOrFail(id: number): Promise<Reservation> {
    return this.findByIdOrFail(id);
  }

  customSave(seller: Reservation): Promise<Reservation> {
    return this.save(seller);
  }
}
