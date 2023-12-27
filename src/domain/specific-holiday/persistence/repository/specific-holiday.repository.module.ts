import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpecificHolidayRepositoryInterfaceToken } from './specific-holiday.repository.interface';
import { SpecificHoliday } from '../specific-holiday.entity';
import { SpecificHolidayRepository } from './specific-holiday.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SpecificHoliday])],
  providers: [
    {
      provide: SpecificHolidayRepositoryInterfaceToken,
      useClass: SpecificHolidayRepository,
    },
  ],
  exports: [SpecificHolidayRepositoryInterfaceToken],
})
export class SpecificHolidayRepositoryModule {}
