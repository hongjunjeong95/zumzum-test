import { Module } from '@nestjs/common';
import { TourRepositoryModule } from '../persistence/repository/tour.repository.module';
import { TourService } from './tour.service';
import { TourRepository } from '../persistence/repository/tour.repository';
import { CacheModule } from '@common/service/cache/cache.module';

@Module({
  imports: [TourRepositoryModule, CacheModule],
  providers: [TourService, TourRepository],
  exports: [TourService],
})
export class TourServiceModule {}
