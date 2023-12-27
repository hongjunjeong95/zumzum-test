import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CustomerRepositoryInterface } from './customer.repository.interface';
import { Customer } from '../customer.entity';

@Injectable()
export class CustomerRepository
  extends Repository<Customer>
  implements CustomerRepositoryInterface
{
  constructor(private dataSource: DataSource) {
    super(Customer, dataSource.createEntityManager());
  }

  protected readonly logger = new Logger(CustomerRepository.name);
  protected readonly ENTITY_NAME = Customer.name;
  protected readonly entity = Customer;

  findByIdOrFail(id: number): Promise<Customer> {
    return this.findByIdOrFail(id);
  }

  customSave(seller: Customer): Promise<Customer> {
    return this.save(seller);
  }
}
