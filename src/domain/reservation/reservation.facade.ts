import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ReservationService } from './service/reservation.service';
import { ReserveBodyDto } from './dtos/reserve.dto';
import { Reservation } from './persistence/reservation.entity';
import { TourService } from '@domain/tour/service/tour.service';
import { AlreadyTokenUsedException } from '@common/filters/server-exception';

@Injectable()
export class ReservationFacade {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly tourService: TourService,
  ) {}

  /**
   *
   * @param customerId
   * @param body
   *
   * @description
   * 1. 투어를 확인해서 max reservation 이내면 자동 승인. 아니면 pending
   * 2. 휴일에 예약하려고 하면 예외 처리
   * 3. 예약 승인 => 승인의 결과 값으로 유일한 토큰 값 생성
   * 4. 예약 펜딩 => 토큰 생성 하지 않음
   */
  public async reserve(
    customerId: number,
    body: ReserveBodyDto,
  ): Promise<void> {
    const tourId = body.tourId;
    const tour = await this.tourService.findOneByIdOrFail(tourId);
    const isApproved = await this.reservationService.isApproved(
      tourId,
      tour.maxReservation,
    );
    const token = await this.reservationService.getToken(isApproved);

    await this.reservationService.save(
      Reservation.create({
        token,
        tourId,
        customerId,
      }),
    );
  }

  public async cancelReservation(
    customerId: number,
    reservationId: number,
  ): Promise<void> {
    return this.reservationService.cancelReservation(reservationId, customerId);
  }

  public async approveReservation(reservationId: number): Promise<void> {
    const reservation = await this.reservationService.findOneByIdOrFail(
      reservationId,
    );
    reservation.token = await this.reservationService.getToken(true);
    await this.reservationService.save(reservation);
  }

  public async approveToken(token: string): Promise<void> {
    const reservation = await this.reservationService.findOneByTokenOrFail(
      token,
    );
    if (reservation.isTokenUsed) {
      throw new AlreadyTokenUsedException();
    }
    reservation.isTokenUsed = true;
    await this.reservationService.save(reservation);
  }
}
