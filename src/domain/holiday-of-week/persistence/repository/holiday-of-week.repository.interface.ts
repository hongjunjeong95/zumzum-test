import { HolidayOfWeek } from '../holiday-of-week.entity';

export const HolidayOfWeekRepositoryInterfaceToken = Symbol(
  'HolidayOfWeekRepositoryInterface',
);
export interface HolidayOfWeekRepositoryInterface {
  customSave(entity: HolidayOfWeek): Promise<HolidayOfWeek>;
  findByIdOrFail(id: number): Promise<HolidayOfWeek>;
}
