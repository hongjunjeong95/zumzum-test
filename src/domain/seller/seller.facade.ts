import { Injectable } from '@nestjs/common';

import { SellerService } from './service/seller.service';

@Injectable()
export class SellerFacade {
  constructor(private readonly sellerService: SellerService) {}
}
