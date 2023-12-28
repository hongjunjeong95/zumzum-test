import { Module } from '@nestjs/common';
import { TourContentRepositoryModule } from '../persistence/repository/tour-content.repository.module';
import { TourContentService } from './tour-content.service';
import { TourContentRepository } from '../persistence/repository/tour-content.repository';
import { CacheModule } from '@common/service/cache/cache.module';

@Module({
  imports: [TourContentRepositoryModule, CacheModule],
  providers: [TourContentService, TourContentRepository],
  exports: [TourContentService],
})
export class TourContentServiceModule {}
