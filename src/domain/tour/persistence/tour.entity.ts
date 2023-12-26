import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Reservation } from 'src/domain/reservation/persistence/reservation.entity';
import { TourContent } from 'src/domain/tour-content/persistence/tour-content.entity';
import { BaseEntity } from '@common/entity/BaseEntity';

@Entity()
export class Tour extends BaseEntity {
  @Column({ name: 'date', type: 'timestamp' })
  date: Date;

  @Column({
    name: 'is_holiday',
    type: 'boolean',
    comment: '특정 날이 휴일인지 여부',
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
}
