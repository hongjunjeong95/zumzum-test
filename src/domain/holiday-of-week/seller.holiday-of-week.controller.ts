import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { HolidayOfWeekFacade } from './holiday-of-week.facade';
import { ApiPrefix } from '@common/constant';
import { ApiResponse } from '@common/dto/api-response.dto';
import { SellerJwtAuthGuard } from '@auth/guards/seller-jwt-auth.guard';
import { CreateHolidayOfWeeksBodyDto } from './dtos/create-many.dto';

@Controller({
  path: `${ApiPrefix.SELLER_API_V1}/holidays-of-week`,
})
@UseGuards(SellerJwtAuthGuard)
@ApiTags('HolidayOfWeek')
export class SellerHolidayOfWeekController {
  constructor(private holidayOfWeekFacade: HolidayOfWeekFacade) {}

  @Post()
  @ApiOperation({ summary: 'Create holidays of week' })
  async createMany(
    @Body() body: CreateHolidayOfWeeksBodyDto,
  ): Promise<ApiResponse<void>> {
    return ApiResponse.success(await this.holidayOfWeekFacade.createMany(body));
  }
}
