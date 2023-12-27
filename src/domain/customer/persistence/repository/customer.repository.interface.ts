import { BaseUserEntity } from '@common/entity/base-user-entity';
import { Customer } from '../customer.entity';

export const CustomerRepositoryInterfaceToken = Symbol(
  'CustomerRepositoryInterface',
);
export interface CustomerRepositoryInterface {
  customSave(entity: BaseUserEntity): Promise<Customer>;
  findOneByEmailOrFail(email: string): Promise<Customer>;
  findOneByEmail(email: string): Promise<Customer | null>;
  findByIdOrFail(id: number): Promise<Customer>;
}
