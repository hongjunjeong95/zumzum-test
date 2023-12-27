import { SpecificHoliday } from '../specific-holiday.entity';

export const SpecificHolidayRepositoryInterfaceToken = Symbol(
  'SpecificHolidayRepositoryInterface',
);
export interface SpecificHolidayRepositoryInterface {
  customSave(entity: SpecificHoliday): Promise<SpecificHoliday>;
  findByIdOrFail(id: number): Promise<SpecificHoliday>;
}
