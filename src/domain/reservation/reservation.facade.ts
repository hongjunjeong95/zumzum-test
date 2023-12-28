import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { ReservationService } from './service/reservation.service';
import { ReserveBodyDto } from './dtos/reserve.dto';
import { TourService } from '@domain/tour/service/tour.service';

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

  @Transactional()
  public async reserve(
    customerId: number,
    body: ReserveBodyDto,
  ): Promise<void> {
    const tour = await this.tourService.findOneByIdOrFail(body.tourId);
    return this.reservationService.reserve(tour, customerId);
  }

  @Transactional()
  public async cancelReservation(
    customerId: number,
    reservationId: number,
  ): Promise<void> {
    return this.reservationService.cancelReservation(reservationId, customerId);
  }

  @Transactional()
  public async approveReservation(reservationId: number): Promise<void> {
    return this.reservationService.approveReservation(reservationId);
  }

  @Transactional()
  public async approveToken(token: string): Promise<void> {
    return this.reservationService.approveToken(token);
  }
}
