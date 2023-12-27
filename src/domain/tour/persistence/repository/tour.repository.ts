import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DataSource, In, MoreThan, Repository } from 'typeorm';

import { TourRepositoryInterface } from './tour.repository.interface';
import { Tour } from '../tour.entity';
import { WeekEnum } from '@domain/holiday-of-week/persistence/holiday-of-week.entity';

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

  customSave(entity: Tour): Promise<Tour>;
  customSave(entity: Tour[]): Promise<Tour[]>;
  customSave(entity: unknown): Promise<Tour | Tour[]> {
    return this.save(entity);
  }

  async findManyBytourContentIdAndInWeeksAndGreaterThanNow(
    tourContentId: number,
    weeks: WeekEnum[],
  ): Promise<Tour[]> {
    return this.find({
      where: {
        tourContentId,
        week: In(weeks),
        date: MoreThan(new Date()),
      },
    });
  }

  async findLastOne(tourContentId: number): Promise<Tour | null> {
    return this.findOne({
      where: {
        tourContentId,
        date: MoreThan(new Date()),
      },
      order: {
        date: 'DESC',
      },
    });
  }

  async findOneByTourContentIdAndLocaleDateStringOrFail(
    tourContentId: number,
    localeDateString: string,
  ): Promise<Tour> {
    const entity = await this.findOneBy({
      tourContentId,
      localeDateString,
    });

    if (entity) {
      return entity;
    }

    throw new NotFoundException("Can't found a tour");
  }

  async findAvailableToursInMonth(
    tourContentId: number,
    targetMonth: number,
  ): Promise<Tour[]> {
    return this.createQueryBuilder('tour')
      .where('MONTH(tour.date) = :targetMonth', {
        targetMonth,
      })
      .andWhere('tour.isHoliday = :isHoliday', { isHoliday: false })
      .andWhere('tour.tourContentId = :tourContentId', {
        tourContentId,
      })
      .getMany();
  }
}
