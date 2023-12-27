import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HolidayOfWeekRepositoryInterfaceToken } from './holiday-of-week.repository.interface';
import { HolidayOfWeek } from '../holiday-of-week.entity';
import { HolidayOfWeekRepository } from './holiday-of-week.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HolidayOfWeek])],
  providers: [
    {
      provide: HolidayOfWeekRepositoryInterfaceToken,
      useClass: HolidayOfWeekRepository,
    },
  ],
  exports: [HolidayOfWeekRepositoryInterfaceToken],
})
export class HolidayOfWeekRepositoryModule {}
