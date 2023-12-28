import { Module } from '@nestjs/common';
import { TourRepositoryModule } from '../persistence/repository/tour.repository.module';
import { TourService } from './tour.service';
import { TourRepository } from '../persistence/repository/tour.repository';
import { CacheServiceModule } from '@common/service/cache/cache.module';

@Module({
  imports: [TourRepositoryModule, CacheServiceModule],
  providers: [TourService, TourRepository],
  exports: [TourService],
})
export class TourServiceModule {}
