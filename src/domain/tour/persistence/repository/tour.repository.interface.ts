import { Tour } from '../tour.entity';

export const TourRepositoryInterfaceToken = Symbol('TourRepositoryInterface');
export interface TourRepositoryInterface {
  customSave(entity: Tour): Promise<Tour>;
  findByIdOrFail(id: number): Promise<Tour>;
}
