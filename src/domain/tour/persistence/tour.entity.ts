import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '@common/entity/base-entity';
import { TourContent } from '@domain/tour-content/persistence/tour-content.entity';
import { Reservation } from '@domain/reservation/persistence/reservation.entity';

@Entity()
export class Tour extends BaseEntity {
  @Column({ name: 'locale_date_string', type: 'varchar' })
  localeDateString: string;

  @Column({ name: 'timezone_offset', type: 'int' })
  timezoneOffset: number;

  @Column({
    name: 'is_holiday',
    type: 'boolean',
    comment: '특정 날이 휴일인지 여부',
    default: false,
  })
  isHoliday: boolean;

  @Column({
    name: 'max_reservations_per_day',
    type: 'int',
    default: 5,
    comment: '하루 최대 자동 예약 허용 수',
  })
  maxReservationsPerDay: number;

  @Column({ name: 'tour_content_id', type: 'int' })
  tourContentId: number;

  @ManyToOne(() => TourContent, (tourContent) => tourContent.tours)
  @JoinColumn({ name: 'tour_content_id' })
  tourContent: TourContent;

  @OneToMany(() => Reservation, (reservation) => reservation.tour)
  reservations: Reservation[];

  static create(data: {
    localeDateString: string;
    tourContentId: number;
    timezoneOffset: number;
  }) {
    const tour = new Tour();
    tour.isHoliday = false;
    tour.maxReservationsPerDay = 5;
    tour.localeDateString = data.localeDateString;
    tour.tourContentId = data.tourContentId;
    tour.timezoneOffset = data.timezoneOffset;

    return tour;
  }
}
