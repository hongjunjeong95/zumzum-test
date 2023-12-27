import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { TourFacade } from './tour.facade';
import { ApiPrefix } from '@common/constant';
import { ApiResponse } from '@common/dto/api-response.dto';
import { SellerJwtAuthGuard } from '@auth/guards/seller-jwt-auth.guard';
import { CreateToursBodyDto } from './dtos/create-many.dto';
import { SetSpecificHolidayBodyDto } from './dtos/set-specific-holiday.dto';

@Controller({
  path: `${ApiPrefix.SELLER_API_V1}/tours`,
})
@UseGuards(SellerJwtAuthGuard)
@ApiTags('Tour')
export class TourController {
  constructor(private tourFacade: TourFacade) {}

  @Post()
  @ApiOperation({ summary: 'Create tours' })
  async createMany(
    @Body() body: CreateToursBodyDto,
  ): Promise<ApiResponse<void>> {
    return ApiResponse.success(await this.tourFacade.createMany(body));
  }

  @Put('/holiday')
  @ApiOperation({ summary: 'Create tours' })
  async setSpecificHoliday(
    @Body() body: SetSpecificHolidayBodyDto,
  ): Promise<ApiResponse<void>> {
    return ApiResponse.success(await this.tourFacade.setSpecificHoliday(body));
  }
}
