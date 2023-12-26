import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@common/entity/BaseEntity';

import { Tour } from 'src/domain/tour/persistence/tour.entity';
import { Seller } from 'src/domain/seller/persistence/seller.entity';

export enum WeekEnum {
  SUNDAY = 'sunday',
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
}

@Entity()
export class TourContent extends BaseEntity {
  @Column({ name: 'content' })
  content: string;

  @Column({
    name: 'holiday_of_week',
    type: 'enum',
    nullable: true,
    enum: WeekEnum,
  })
  holidayOfWeek: WeekEnum;

  @Column({ name: 'seller_id', type: 'int' })
  sellerId: number;

  @ManyToOne(() => Seller, (seller) => seller.tourContents)
  @JoinColumn({ name: 'seller_id' })
  seller: Seller;

  @OneToMany(() => Tour, (tour) => tour.tourContent)
  tours: Tour[];
}
