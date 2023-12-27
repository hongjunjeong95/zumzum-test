import { Module } from '@nestjs/common';
import { TourRepositoryModule } from '../persistence/repository/tour.repository.module';
import { TourService } from './tour.service';
import { TourRepository } from '../persistence/repository/tour.repository';

@Module({
  imports: [TourRepositoryModule],
  providers: [TourService, TourRepository],
  exports: [TourService],
})
export class TourServiceModule {}
