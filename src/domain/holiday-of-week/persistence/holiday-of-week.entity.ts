import { Entity, Column, ManyToOne, JoinColumn, Unique, Index } from 'typeorm';
import { BaseEntity } from '@common/entity/base-entity';
import { TourContent } from '@domain/tour-content/persistence/tour-content.entity';

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
@Unique(['week', 'tourContentId'])
export class HolidayOfWeek extends BaseEntity {
  @Column({
    name: 'week',
    type: 'enum',
    nullable: true,
    enum: WeekEnum,
  })
  @Index()
  week: WeekEnum;

  @Column({ name: 'tour_content_id', type: 'int' })
  tourContentId: number;

  @ManyToOne(() => TourContent, (tourContent) => tourContent.holidaysOfWeek)
  @JoinColumn({ name: 'tour_content_id' })
  tourContent: TourContent;

  static create(data: { week: WeekEnum; tourContentId: number }) {
    const holidayOfWeek = new HolidayOfWeek();
    holidayOfWeek.week = data.week;
    holidayOfWeek.tourContentId = data.tourContentId;

    return holidayOfWeek;
  }
}
