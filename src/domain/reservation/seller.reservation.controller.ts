import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ReservationFacade } from './reservation.facade';
import { ApiPrefix } from '@common/constant';
import { SellerJwtAuthGuard } from '@auth/guards/seller-jwt-auth.guard';
import { ApiResponse } from '@common/dto/api-response.dto';
import { ApproveReservationTokenBodyDto } from './dtos/approve-token.dto';

@Controller({
  path: `${ApiPrefix.SELLER_API_V1}/reservations`,
})
@UseGuards(SellerJwtAuthGuard)
@ApiTags('Reservation')
export class SellerReservationController {
  constructor(private reservationFacade: ReservationFacade) {}

  @Put('/token')
  @ApiOperation({ summary: 'Approve a token' })
  async approveToken(
    @Body() body: ApproveReservationTokenBodyDto,
  ): Promise<ApiResponse<void>> {
    return ApiResponse.success(
      await this.reservationFacade.approveToken(body.token),
    );
  }

  @Put('/:reservationId')
  @ApiOperation({ summary: 'Approve a reservation' })
  async approveReservation(
    @Param('reservationId', ParseIntPipe) reservationId: number,
  ): Promise<ApiResponse<void>> {
    return ApiResponse.success(
      await this.reservationFacade.approveReservation(reservationId),
    );
  }
}
