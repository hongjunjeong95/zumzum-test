import { Module } from '@nestjs/common';
import { TourContentModule } from './tour-content/tour-content.module';
import { TourModule } from './tour/tour.module';

@Module({
  imports: [TourContentModule, TourModule],
})
export class DomainModule {}
