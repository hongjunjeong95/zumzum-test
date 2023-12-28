import { Tour, WeekEnum } from '../tour.entity';

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
  findOneByIdOrFail(tourId: number): Promise<Tour>;
  findOneByTourContentIdAndLocaleDateStringOrFail(
    tourContentId: number,
    localeDateString: string,
  ): Promise<Tour>;
  findAvailableToursInMonth(
    tourContentId: number,
    targetMonth: number,
  ): Promise<Tour[]>;
}
