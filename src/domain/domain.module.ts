import { Module } from '@nestjs/common';
import { TourContentModule } from './tour-content/tour-content.module';

@Module({
  imports: [TourContentModule],
})
export class DomainModule {}
