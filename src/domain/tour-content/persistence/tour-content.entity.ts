import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from '@common/entity/base-entity';
import { Seller } from '@domain/seller/persistence/seller.entity';
import { Tour, WeekEnum } from '@domain/tour/persistence/tour.entity';

@Entity()
export class TourContent extends BaseEntity {
  @Column({ name: 'content' })
  content: string;

  @Column({
    name: 'holidays_of_week',
    type: 'simple-array',
    nullable: true,
  })
  holidaysOfWeek: WeekEnum[];

  @Column({ name: 'seller_id', type: 'int' })
  sellerId: number;

  @ManyToOne(() => Seller, (seller) => seller.tourContents)
  @JoinColumn({ name: 'seller_id' })
  seller: Seller;

  @OneToMany(() => Tour, (tour) => tour.tourContent)
  tours: Tour[];

  static create(data: { content: string; sellerId: number }) {
    const tourContent = new TourContent();
    tourContent.content = data.content;
    tourContent.sellerId = data.sellerId;

    return tourContent;
  }
}
