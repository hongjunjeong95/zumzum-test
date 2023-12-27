import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { TourFacade } from './tour.facade';
import { ApiPrefix } from '@common/constant';
import { ApiResponse } from '@common/dto/api-response.dto';
import { SellerJwtAuthGuard } from '@auth/guards/seller-jwt-auth.guard';
import { CreateToursBodyDto } from './dtos/create-many.dto';

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
}
