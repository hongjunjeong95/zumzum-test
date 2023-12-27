import { Module } from '@nestjs/common';
import { TourContentRepositoryModule } from '../persistence/repository/tour-content.repository.module';
import { TourContentService } from './tour-content.service';
import { TourContentRepository } from '../persistence/repository/tour-content.repository';

@Module({
  imports: [TourContentRepositoryModule],
  providers: [TourContentService, TourContentRepository],
  exports: [TourContentService],
})
export class TourContentServiceModule {}
