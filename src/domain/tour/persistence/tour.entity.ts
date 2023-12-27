import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '@common/entity/base-entity';
import { TourContent } from '@domain/tour-content/persistence/tour-content.entity';
import { Reservation } from '@domain/reservation/persistence/reservation.entity';
import { WeekEnum } from '@domain/holiday-of-week/persistence/holiday-of-week.entity';

@Entity()
export class Tour extends BaseEntity {
  @Column({ name: 'date', type: 'timestamp' })
  date: Date;

  @Column({ name: 'locale_date_string', type: 'varchar' })
  localeDateString: string;

  @Column({ name: 'timezone_offset', type: 'int' })
  timezoneOffset: number;

  @Column({
    name: 'week',
    type: 'enum',
    enum: WeekEnum,
  })
  week: WeekEnum;

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
    date: Date;
    week: WeekEnum;
    isHoliday: boolean;
    localeDateString: string;
    tourContentId: number;
    timezoneOffset: number;
  }) {
    const tour = new Tour();
    tour.isHoliday = data.isHoliday;
    tour.maxReservationsPerDay = 5;
    tour.date = data.date;
    tour.week = data.week;
    tour.localeDateString = data.localeDateString;
    tour.tourContentId = data.tourContentId;
    tour.timezoneOffset = data.timezoneOffset;

    return tour;
  }

  update(data: {
    date: Date;
    localeDateString: string;
    tourContentId: number;
    timezoneOffset: number;
  }) {
    const tour = new Tour();
    tour.isHoliday = false;
    tour.maxReservationsPerDay = 5;
    tour.date = data.date;
    tour.localeDateString = data.localeDateString;
    tour.tourContentId = data.tourContentId;
    tour.timezoneOffset = data.timezoneOffset;

    return tour;
  }
}
