import { TourContent } from '../tour-content.entity';

export const TourContentRepositoryInterfaceToken = Symbol(
  'TourContentRepositoryInterface',
);
export interface TourContentRepositoryInterface {
  customSave(entity: TourContent): Promise<TourContent>;
  findByIdOrFail(id: number): Promise<TourContent>;
}
