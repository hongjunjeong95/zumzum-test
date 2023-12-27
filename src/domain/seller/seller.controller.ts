import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SellerFacade } from './seller.facade';

@Controller({
  path: 'sellers',
})
@ApiTags('Sellers')
export class SellerController {
  constructor(private sellerFacade: SellerFacade) {}
}
