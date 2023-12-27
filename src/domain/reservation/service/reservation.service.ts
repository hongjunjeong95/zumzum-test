import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { nanoid } from 'nanoid';

import { Reservation } from '../persistence/reservation.entity';
import {
  ReservationRepositoryInterface,
  ReservationRepositoryInterfaceToken,
} from '../persistence/repository/reservation.repository.interface';
import { DateUtils } from '@helpers/date.utils';
import { LateCancelReservationException } from '@common/filters/server-exception';

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

  async findOneByIdWithTourOrFail(reservationId: number): Promise<Reservation> {
    return this.reservationRepository.findOneByIdWithTourOrFail(reservationId);
  }

  async findOneByTokenOrFail(token: string): Promise<Reservation> {
    return this.reservationRepository.findOneByTokenOrFail(token);
  }

  public async cancelReservation(
    reservationId: number,
    customerId: number,
  ): Promise<void> {
    const reservation = await this.findOneByIdWithTourOrFail(reservationId);

    if (reservation.customerId !== customerId) {
      throw new UnauthorizedException();
    }

    const daysUntilTour = DateUtils.getDaysUntilDate(reservation.tour.date);
    const availableCancelDays = 3;

    if (daysUntilTour >= availableCancelDays) {
      reservation.isCancelled = true;
      await this.save(reservation);
    } else {
      throw new LateCancelReservationException();
    }
  }
}
