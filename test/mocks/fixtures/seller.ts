import { Seller } from '@domain/seller/persistence/seller.entity';
import { BCryptUtils } from '@helpers/bcrypt.utils';

export const getMockSeller = async () => {
  const seller = new Seller();
  seller.id = 1;
  seller.createdAt = new Date();
  seller.updatedAt = new Date();
  seller.name = 'seller-name';
  seller.email = 'seller@gmail.com';
  seller.password = await BCryptUtils.encrypt('password12345678');

  return seller;
};
