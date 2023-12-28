import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TourContentRepositoryInterface } from './tour-content.repository.interface';
import { TourContent } from '../tour-content.entity';

@Injectable()
export class TourContentRepository
  extends Repository<TourContent>
  implements TourContentRepositoryInterface
{
  constructor(private dataSource: DataSource) {
    super(TourContent, dataSource.createEntityManager());
  }

  protected readonly logger = new Logger(TourContentRepository.name);
  protected readonly ENTITY_NAME = TourContent.name;
  protected readonly entity = TourContent;

  async findByIdOrFail(id: number): Promise<TourContent> {
    return this.findByIdOrFail(id);
  }

  async customSave(seller: TourContent): Promise<TourContent> {
    return this.save(seller);
  }
}
