import { Module } from '@nestjs/common';

import { SellerController } from './seller.controller';
import { SellerFacade } from './seller.facade';
import { SellerServiceModule } from './service/seller.module';

@Module({
  imports: [SellerServiceModule],
  controllers: [SellerController],
  providers: [SellerFacade],
})
export class SellerModule {}
