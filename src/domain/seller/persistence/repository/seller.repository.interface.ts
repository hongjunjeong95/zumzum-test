import { BaseUserEntity } from '@common/entity/base-user-entity';
import { Seller } from '../seller.entity';

export const SellerRepositoryInterfaceToken = Symbol(
  'SellerRepositoryInterface',
);
export interface SellerRepositoryInterface {
  customSave(entity: BaseUserEntity): Promise<Seller>;
  findOneByEmailOrFail(email: string): Promise<Seller>;
  findOneByEmail(email: string): Promise<Seller | null>;
  findByIdOrFail(id: number): Promise<Seller>;
}
