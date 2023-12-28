import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { TourContentFacade } from './tour-content.facade';
import { ApiPrefix } from '@common/constant';
import { CreateTourContentBodyDto } from './dtos/create.dto';
import { ApiResponse } from '@common/dto/api-response.dto';
import { SellerJwtAuthGuard } from '@auth/guards/seller-jwt-auth.guard';
import { AuthUser } from '@auth/decorators/auth-user.decorator';
import { Seller } from '@domain/seller/persistence/seller.entity';

@Controller({
  path: `${ApiPrefix.SELLER_API_V1}/tour-contents`,
})
@UseGuards(SellerJwtAuthGuard)
@ApiTags('TourContent')
export class SellerTourContentController {
  constructor(private tourContentFacade: TourContentFacade) {}

  @Post()
  @ApiOperation({ summary: 'Create a tour content' })
  async create(
    @AuthUser() seller: Seller,
    @Body() body: CreateTourContentBodyDto,
  ): Promise<ApiResponse<void>> {
    return ApiResponse.success(
      await this.tourContentFacade.create(seller.id, body),
    );
  }
}
