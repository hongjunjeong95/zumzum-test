import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Seller } from '../seller.entity';
import { SellerRepository } from './seller.repository';
import { SellerRepositoryInterfaceToken } from './seller.repository.interface';
import { TourContentRepositoryModule } from '@domain/tour-content/persistence/repository/tour-content.repository.module';

@Module({
  imports: [TypeOrmModule.forFeature([Seller]), TourContentRepositoryModule],
  providers: [
    {
      provide: SellerRepositoryInterfaceToken,
      useClass: SellerRepository,
    },
  ],
  exports: [SellerRepositoryInterfaceToken],
})
export class SellerRepositoryModule {}
