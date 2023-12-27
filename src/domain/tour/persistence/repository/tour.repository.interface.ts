import { WeekEnum } from '@domain/holiday-of-week/persistence/holiday-of-week.entity';
import { Tour } from '../tour.entity';

export const TourRepositoryInterfaceToken = Symbol('TourRepositoryInterface');
export interface TourRepositoryInterface {
  customSave(entity: Tour): Promise<Tour>;
  customSave(entities: Tour[]): Promise<Tour[]>;
  findByIdOrFail(id: number): Promise<Tour>;
  findManyInWeeksAndGreaterThanNow(weeks: WeekEnum[]): Promise<Tour[]>;
  // setHolidayByWeeks(): Promise<Tour[]>;
}
