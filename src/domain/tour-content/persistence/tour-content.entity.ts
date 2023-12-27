import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@common/entity/BaseEntity';

import { Tour } from 'src/domain/tour/persistence/tour.entity';
import { Seller } from 'src/domain/seller/persistence/seller.entity';
import { HolidayOfWeek } from 'src/domain/holiday-of-week/persistence/holiday-of-week.entity';
import { SpecificHoliday } from 'src/domain/specific-holiday/persistence/specific-holiday.entity';

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
}
