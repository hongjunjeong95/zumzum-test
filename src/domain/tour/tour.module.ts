import { Module } from '@nestjs/common';

import { TourFacade } from './tour.facade';
import { TourServiceModule } from './service/tour.module';
import { TourController } from './tour.controller';

@Module({
  imports: [TourServiceModule],
  controllers: [TourController],
  providers: [TourFacade],
})
export class TourModule {}
