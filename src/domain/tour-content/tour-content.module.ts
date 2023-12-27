import { Module } from '@nestjs/common';

import { TourContentFacade } from './tour-content.facade';
import { TourContentServiceModule } from './service/tour-content.module';
import { TourContentController } from './tour-content.controller';

@Module({
  imports: [TourContentServiceModule],
  controllers: [TourContentController],
  providers: [TourContentFacade],
})
export class TourContentModule {}
