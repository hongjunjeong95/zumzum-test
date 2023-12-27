import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerRepositoryInterfaceToken } from './customer.repository.interface';
import { Customer } from '../customer.entity';
import { CustomerRepository } from './customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [
    {
      provide: CustomerRepositoryInterfaceToken,
      useClass: CustomerRepository,
    },
  ],
  exports: [CustomerRepositoryInterfaceToken],
})
export class CustomerRepositoryModule {}
