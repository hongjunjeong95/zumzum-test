import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TourRepositoryInterface } from './tour.repository.interface';
import { Tour } from '../tour.entity';

@Injectable()
export class TourRepository
  extends Repository<Tour>
  implements TourRepositoryInterface
{
  constructor(private dataSource: DataSource) {
    super(Tour, dataSource.createEntityManager());
  }

  protected readonly logger = new Logger(TourRepository.name);
  protected readonly ENTITY_NAME = Tour.name;
  protected readonly entity = Tour;

  findByIdOrFail(id: number): Promise<Tour> {
    return this.findByIdOrFail(id);
  }

  customSave(seller: Tour): Promise<Tour> {
    return this.save(seller);
  }
}
