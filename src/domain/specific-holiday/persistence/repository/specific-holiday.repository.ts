import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { SpecificHolidayRepositoryInterface } from './specific-holiday.repository.interface';
import { SpecificHoliday } from '../specific-holiday.entity';

@Injectable()
export class SpecificHolidayRepository
  extends Repository<SpecificHoliday>
  implements SpecificHolidayRepositoryInterface
{
  constructor(private dataSource: DataSource) {
    super(SpecificHoliday, dataSource.createEntityManager());
  }

  protected readonly logger = new Logger(SpecificHolidayRepository.name);
  protected readonly ENTITY_NAME = SpecificHoliday.name;
  protected readonly entity = SpecificHoliday;

  findByIdOrFail(id: number): Promise<SpecificHoliday> {
    return this.findByIdOrFail(id);
  }

  customSave(seller: SpecificHoliday): Promise<SpecificHoliday> {
    return this.save(seller);
  }
}
