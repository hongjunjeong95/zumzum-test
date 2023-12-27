import { Inject, Injectable, Logger } from '@nestjs/common';
import { nanoid } from 'nanoid';

import { Reservation } from '../persistence/reservation.entity';
import {
  ReservationRepositoryInterface,
  ReservationRepositoryInterfaceToken,
} from '../persistence/repository/reservation.repository.interface';

@Injectable()
export class ReservationService {
  constructor(
    @Inject(ReservationRepositoryInterfaceToken)
    private readonly reservationRepository: ReservationRepositoryInterface,
  ) {}

  private readonly logger = new Logger(Reservation.name);

  save(reservation: Reservation): Promise<Reservation>;
  save(reservations: Reservation[]): Promise<Reservation[]>;
  async save(
    entity: Reservation | Reservation[],
  ): Promise<Reservation | Reservation[]> {
    if (Array.isArray(entity)) {
      return this.reservationRepository.customSave(entity);
    } else {
      return this.reservationRepository.customSave(entity);
    }
  }

  async getToken(isApproved: boolean) {
    return isApproved ? nanoid(36).toString() : null;
  }

  async isApproved(tourId: number, maxReservation: number) {
    const currentReservationCount =
      await this.reservationRepository.getCurrentReservationCount(tourId);

    return currentReservationCount < maxReservation ? true : false;
  }

  async findOneByIdOrFail(reservationId: number): Promise<Reservation> {
    return this.reservationRepository.findOneByIdOrFail(reservationId);
  }
}
