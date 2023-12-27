import { Seller } from '../seller.entity';

export const SellerRepositoryInterfaceToken = Symbol(
  'SellerRepositoryInterface',
);
export interface SellerRepositoryInterface {
  customSave(entity: Seller): Promise<Seller>;
  findOneByEmailOrFail(email: string): Promise<Seller>;
  findByIdOrFail(id: number): Promise<Seller>;
}
