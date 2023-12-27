import { WeekEnum } from '@domain/holiday-of-week/persistence/holiday-of-week.entity';
import { Tour } from '../tour.entity';

export const TourRepositoryInterfaceToken = Symbol('TourRepositoryInterface');
export interface TourRepositoryInterface {
  customSave(entity: Tour): Promise<Tour>;
  customSave(entities: Tour[]): Promise<Tour[]>;
  findByIdOrFail(id: number): Promise<Tour>;
  findManyBytourContentIdAndInWeeksAndGreaterThanNow(
    tourContentId: number,
    weeks: WeekEnum[],
  ): Promise<Tour[]>;
  findLastOne(tourContentId: number): Promise<Tour | null>;
  findOneByTourContentIdAndLocaleDateStringOrFail(
    tourContentId: number,
    localeDateString: string,
  ): Promise<Tour>;
  findAvailableToursInMonth(
    tourContentId: number,
    targetMonth: number,
  ): Promise<Tour[]>;
}
