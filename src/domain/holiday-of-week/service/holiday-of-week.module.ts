import { Module } from '@nestjs/common';
import { HolidayOfWeekService } from './holiday-of-week.service';
import { HolidayOfWeekRepository } from '../persistence/repository/holiday-of-week.repository';
import { HolidayOfWeekRepositoryModule } from '../persistence/repository/holiday-of-week.repository.module';
import { CacheServiceModule } from '@common/service/cache/cache.module';

@Module({
  imports: [HolidayOfWeekRepositoryModule, CacheServiceModule],
  providers: [HolidayOfWeekService, HolidayOfWeekRepository],
  exports: [HolidayOfWeekService],
})
export class HolidayOfWeekServiceModule {}
