import { Module } from '@nestjs/common';

import { TourContentFacade } from './tour-content.facade';
import { TourContentServiceModule } from './service/tour-content.module';
import { SellerTourContentController } from './seller.tour-content.controller';

@Module({
  imports: [TourContentServiceModule],
  controllers: [SellerTourContentController],
  providers: [TourContentFacade],
})
export class TourContentModule {}
