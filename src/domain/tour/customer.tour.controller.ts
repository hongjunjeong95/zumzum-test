import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { TourFacade } from './tour.facade';
import { ApiPrefix } from '@common/constant';
import { CustomerJwtAuthGuard } from '@auth/guards/customer-jwt-auth.guard';
import { ApiResponse } from '@common/dto/api-response.dto';
import { FindToursQueryDto, TourListResponse } from './dtos/find-many.dto';

@Controller({
  path: `${ApiPrefix.CUSTOMER_API_V1}/tours`,
})
@UseGuards(CustomerJwtAuthGuard)
@ApiTags('Tour')
export class CustomerTourController {
  constructor(private tourFacade: TourFacade) {}

  @Get()
  @ApiOperation({ summary: 'Get available tours' })
  async getAvailableTours(
    @Query() query: FindToursQueryDto,
  ): Promise<ApiResponse<TourListResponse>> {
    return ApiResponse.success(
      TourListResponse.of(await this.tourFacade.getAvailableTours(query)),
    );
  }
}
