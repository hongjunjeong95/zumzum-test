import { Module } from '@nestjs/common';
import { SellerRepositoryModule } from '../persistence/repository/seller.repository.module';
import { SellerService } from './seller.service';
import { SellerRepository } from '../persistence/repository/seller.repository';

@Module({
  imports: [SellerRepositoryModule],
  providers: [SellerService, SellerRepository],
  exports: [SellerService],
})
export class SellerServiceModule {}
