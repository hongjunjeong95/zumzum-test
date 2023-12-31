import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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

  async findByIdOrFail(id: number): Promise<Reservation> {
    return this.findByIdOrFail(id);
  }

  customSave(entity: Reservation): Promise<Reservation>;
  customSave(entity: Reservation[]): Promise<Reservation[]>;
  async customSave(entity: unknown): Promise<Reservation | Reservation[]> {
    return this.save(entity);
  }

  async getCurrentReservationCount(tourId: number): Promise<number> {
    return this.count({
      where: {
        tourId,
      },
    });
  }

  async findOneByIdOrFail(reservationId: number): Promise<Reservation | null> {
    const entity = await this.findOneBy({
      id: reservationId,
    });

    if (entity) {
      return entity;
    }

    throw new NotFoundException("Can't find a reservation by reservationId");
  }

  async findOneByIdWithTourOrFail(
    reservationId: number,
  ): Promise<Reservation | null> {
    const entity = await this.findOne({
      where: {
        id: reservationId,
      },
      relations: {
        tour: true,
      },
    });

    if (entity) {
      return entity;
    }

    throw new NotFoundException("Can't find a reservation by reservationId");
  }

  async findOneByTokenOrFail(token: string): Promise<Reservation | null> {
    const entity = await this.findOneBy({
      token,
    });

    if (entity) {
      return entity;
    }

    throw new NotFoundException("Can't find a reservation by token");
  }
}
