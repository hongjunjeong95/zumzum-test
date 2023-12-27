import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { HolidayOfWeekRepositoryInterface } from './holiday-of-week.repository.interface';
import { HolidayOfWeek } from '../holiday-of-week.entity';

@Injectable()
export class HolidayOfWeekRepository
  extends Repository<HolidayOfWeek>
  implements HolidayOfWeekRepositoryInterface
{
  constructor(private dataSource: DataSource) {
    super(HolidayOfWeek, dataSource.createEntityManager());
  }

  protected readonly logger = new Logger(HolidayOfWeekRepository.name);
  protected readonly ENTITY_NAME = HolidayOfWeek.name;
  protected readonly entity = HolidayOfWeek;

  findByIdOrFail(id: number): Promise<HolidayOfWeek> {
    return this.findByIdOrFail(id);
  }

  customSave(entity: HolidayOfWeek): Promise<HolidayOfWeek>;
  customSave(entity: HolidayOfWeek[]): Promise<HolidayOfWeek[]>;
  customSave(entity: unknown): Promise<HolidayOfWeek | HolidayOfWeek[]> {
    return this.save(entity);
  }
}
