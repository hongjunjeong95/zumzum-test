import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TourContentRepositoryInterfaceToken } from './tour-content.repository.interface';
import { TourContent } from '../tour-content.entity';
import { TourContentRepository } from './tour-content.repository';
import { TourRepositoryModule } from '@domain/tour/persistence/repository/tour.repository.module';

@Module({
  imports: [TypeOrmModule.forFeature([TourContent]), TourRepositoryModule],
  providers: [
    {
      provide: TourContentRepositoryInterfaceToken,
      useClass: TourContentRepository,
    },
  ],
  exports: [TourContentRepositoryInterfaceToken],
})
export class TourContentRepositoryModule {}
