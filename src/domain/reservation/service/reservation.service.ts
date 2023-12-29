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
import { Tour, WeekEnum } from '@domain/tour/persistence/tour.entity';

@Injectable()
export class ReservationService {
  constructor(
    @Inject(ReservationRepositoryInterfaceToken)
    private readonly reservationRepository: ReservationRepositoryInterface,
  ) {}

  private readonly logger = new Logger(Reservation.name);

  public async getToken(isApproved: boolean) {
    return isApproved ? nanoid(36).toString() : null;
  }

  public async isApproved(
    tourId: number,
    maxReservation: number,
  ): Promise<boolean> {
    const currentReservationCount =
      await this.reservationRepository.getCurrentReservationCount(tourId);

    return currentReservationCount < maxReservation ? true : false;
  }

  async findOneByIdOrFail(reservationId: number): Promise<Reservation> {
    return this.reservationRepository.findOneByIdOrFail(reservationId);
  }

  /**
   *
   * @param tour
   * @param customerId
   * @param holidaysOfWeeks
   * @description
   * 1. 동시성 문제로 User A, B가 동시에 this.isApproved를 통과하고 A가 먼저 함수를 빠져나서 카운트가
   * 다 찼음에도 불구하고 B도 자동 승인이 될 수 있음. Isolation Serializable하게 facade 쪽에서 처리해줘야 함.
   */
  public async reserve(
    tour: Tour,
    customerId: number,
    holidaysOfWeeks: WeekEnum[],
  ): Promise<void> {
    if (this.isHoliday(tour, holidaysOfWeeks)) {
      throw new HolidayReservationException();
    }

    const tourId = tour.id;
    const isApproved = await this.isApproved(tourId, tour.maxReservation);
    const token = await this.getToken(isApproved);

    await this.reservationRepository.customSave(
      Reservation.create({
        token,
        tourId,
        customerId,
      }),
    );
  }

  private isHoliday(tour: Tour, holidaysOfWeeks: WeekEnum[]) {
    return tour.isHoliday || holidaysOfWeeks.includes(tour.week);
  }

  public async approveReservation(reservationId: number): Promise<void> {
    const reservation = await this.findOneByIdOrFail(reservationId);
    reservation.token = await this.getToken(true);
    await this.reservationRepository.customSave(reservation);
  }

  public async approveToken(token: string): Promise<void> {
    const reservation = await this.reservationRepository.findOneByTokenOrFail(
      token,
    );
    if (reservation.isTokenUsed) {
      throw new AlreadyTokenUsedException();
    }
    reservation.isTokenUsed = true;
    await this.reservationRepository.customSave(reservation);
  }

  public async cancelReservation(
    reservationId: number,
    customerId: number,
  ): Promise<void> {
    const reservation =
      await this.reservationRepository.findOneByIdWithTourOrFail(reservationId);

    if (reservation.customerId !== customerId) {
      throw new UnauthorizedException();
    }

    const daysUntilTour = DateUtils.getDaysUntilDate(reservation.tour.date);
    const availableCancelDays = 3;

    if (daysUntilTour >= availableCancelDays) {
      reservation.isCancelled = true;
      await this.reservationRepository.customSave(reservation);
    } else {
      throw new LateCancelReservationException();
    }
  }
}
