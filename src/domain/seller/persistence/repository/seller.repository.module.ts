import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Seller } from '../seller.entity';
import { SellerRepository } from './seller.repository';
import { SellerRepositoryInterfaceToken } from './seller.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Seller])],
  providers: [
    {
      provide: SellerRepositoryInterfaceToken,
      useClass: SellerRepository,
    },
  ],
  exports: [SellerRepositoryInterfaceToken],
})
export class SellerRepositoryModule {}
