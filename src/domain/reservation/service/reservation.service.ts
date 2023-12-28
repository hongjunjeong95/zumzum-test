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
import {
  AlreadyTokenUsedException,
  HolidayReservationException,
  LateCancelReservationException,
} from '@common/filters/server-exception';
import { Tour } from '@domain/tour/persistence/tour.entity';

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

  private async getToken(isApproved: boolean) {
    return isApproved ? nanoid(36).toString() : null;
  }

  private async isApproved(tourId: number, maxReservation: number) {
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

  public async reserve(tour: Tour, customerId: number): Promise<void> {
    const tourId = tour.id;
    const isApproved = await this.isApproved(tourId, tour.maxReservation);
    const token = await this.getToken(isApproved);

    if (tour.isHoliday) {
      throw new HolidayReservationException();
    }

    await this.save(
      Reservation.create({
        token,
        tourId,
        customerId,
      }),
    );
  }

  public async approveReservation(reservationId: number): Promise<void> {
    const reservation = await this.findOneByIdOrFail(reservationId);
    reservation.token = await this.getToken(true);
    await this.save(reservation);
  }

  public async approveToken(token: string): Promise<void> {
    const reservation = await this.findOneByTokenOrFail(token);
    if (reservation.isTokenUsed) {
      throw new AlreadyTokenUsedException();
    }
    reservation.isTokenUsed = true;
    await this.save(reservation);
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
