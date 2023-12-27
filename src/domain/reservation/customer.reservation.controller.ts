import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ReservationFacade } from './reservation.facade';
import { ApiPrefix } from '@common/constant';
import { CustomerJwtAuthGuard } from '@auth/guards/customer-jwt-auth.guard';
import { ApiResponse } from '@common/dto/api-response.dto';
import { AuthUser } from '@auth/decorators/auth-user.decorator';
import { Customer } from '@domain/customer/persistence/customer.entity';
import { ReserveBodyDto } from './dtos/reserve.dto';

@Controller({
  path: `${ApiPrefix.CUSTOMER_API_V1}/reservations`,
})
@UseGuards(CustomerJwtAuthGuard)
@ApiTags('Reservation')
export class CustomerReservationController {
  constructor(private reservationFacade: ReservationFacade) {}

  @Post()
  @ApiOperation({ summary: 'Make a reservation' })
  async reserve(
    @AuthUser() customer: Customer,
    @Body() body: ReserveBodyDto,
  ): Promise<ApiResponse<void>> {
    return ApiResponse.success(
      await this.reservationFacade.reserve(customer.id, body),
    );
  }
}
