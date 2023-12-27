import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TourContentRepositoryInterfaceToken } from './tour-content.repository.interface';
import { TourContent } from '../tour-content.entity';
import { TourContentRepository } from './tour-content.repository';
import { TourRepositoryModule } from 'src/domain/tour/persistence/repository/tour.repository.module';
import { SpecificHolidayRepositoryModule } from 'src/domain/specific-holiday/persistence/repository/specific-holiday.repository.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TourContent]),
    TourRepositoryModule,
    SpecificHolidayRepositoryModule,
  ],
  providers: [
    {
      provide: TourContentRepositoryInterfaceToken,
      useClass: TourContentRepository,
    },
  ],
  exports: [TourContentRepositoryInterfaceToken],
})
export class TourContentRepositoryModule {}
