import { Inject, Injectable, Logger } from '@nestjs/common';

import { Seller } from '../persistence/seller.entity';
import {
  SellerRepositoryInterface,
  SellerRepositoryInterfaceToken,
} from '../persistence/repository/seller.repository.interface';

@Injectable()
export class SellerService {
  constructor(
    @Inject(SellerRepositoryInterfaceToken)
    private readonly sellerRepository: SellerRepositoryInterface,
  ) {}

  private readonly logger = new Logger(Seller.name);
}
