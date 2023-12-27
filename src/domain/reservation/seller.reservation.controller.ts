import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ReservationFacade } from './reservation.facade';
import { ApiPrefix } from '@common/constant';
import { SellerJwtAuthGuard } from '@auth/guards/seller-jwt-auth.guard';

@Controller({
  path: `${ApiPrefix.SELLER_API_V1}/reservations`,
})
@UseGuards(SellerJwtAuthGuard)
@ApiTags('Reservation')
export class SellerReservationController {
  constructor(private reservationFacade: ReservationFacade) {}
}
