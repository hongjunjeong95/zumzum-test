import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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

  async findOneByIdOrFail(id: number): Promise<TourContent> {
    const entity = await this.findOneBy({
      id,
    });

    if (entity) {
      return entity;
    }

    throw new NotFoundException("Can't find a tour content");
  }

  async customSave(seller: TourContent): Promise<TourContent> {
    return this.save(seller);
  }
}
