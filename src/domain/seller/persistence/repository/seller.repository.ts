import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { SellerRepositoryInterface } from './seller.repository.interface';
import { Seller } from '../seller.entity';

@Injectable()
export class SellerRepository
  extends Repository<Seller>
  implements SellerRepositoryInterface
{
  constructor(private dataSource: DataSource) {
    super(Seller, dataSource.createEntityManager());
  }

  protected readonly logger = new Logger(SellerRepository.name);
  protected readonly ENTITY_NAME = Seller.name;
  protected readonly entity = Seller;

  async findOneByEmailOrFail(email: string): Promise<Seller> {
    return this.findOneByOrFail({
      email,
    });
  }

  async findOneByEmail(email: string): Promise<Seller | null> {
    return this.findOneBy({
      email,
    });
  }

  async findByIdOrFail(id: number): Promise<Seller> {
    return this.findByIdOrFail(id);
  }

  async customSave(seller: Seller): Promise<Seller> {
    return this.save(seller);
  }
}
