import { Customer } from '../customer.entity';

export const CustomerRepositoryInterfaceToken = Symbol(
  'CustomerRepositoryInterface',
);
export interface CustomerRepositoryInterface {
  customSave(entity: Customer): Promise<Customer>;
  findByIdOrFail(id: number): Promise<Customer>;
}
