import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from '@common/entity/base-entity';
import { Seller } from '@domain/seller/persistence/seller.entity';
import { Tour } from '@domain/tour/persistence/tour.entity';
import { HolidayOfWeek } from '@domain/holiday-of-week/persistence/holiday-of-week.entity';
import { SpecificHoliday } from '@domain/specific-holiday/persistence/specific-holiday.entity';

@Entity()
export class TourContent extends BaseEntity {
  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'seller_id', type: 'int' })
  sellerId: number;

  @ManyToOne(() => Seller, (seller) => seller.tourContents)
  @JoinColumn({ name: 'seller_id' })
  seller: Seller;

  @OneToMany(() => Tour, (tour) => tour.tourContent)
  tours: Tour[];

  @OneToMany(() => HolidayOfWeek, (holidayOfWeek) => holidayOfWeek.tourContent)
  holidaysOfWeek: HolidayOfWeek[];

  @OneToMany(
    () => SpecificHoliday,
    (specificHoliday) => specificHoliday.tourContent,
  )
  specificHoliday: SpecificHoliday[];

  static create(data: { content: string; sellerId: number }) {
    const tourContent = new TourContent();
    tourContent.content = data.content;
    tourContent.sellerId = data.sellerId;

    return tourContent;
  }
}
