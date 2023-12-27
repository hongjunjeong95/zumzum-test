import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TourContent } from 'src/domain/tour-content/persistence/tour-content.entity';
import { BaseEntity } from '@common/entity/base-entity';

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
export class HolidayOfWeek extends BaseEntity {
  @Column({
    name: 'week',
    type: 'enum',
    nullable: true,
    enum: WeekEnum,
  })
  week: WeekEnum;

  @Column({ name: 'tour_content_id', type: 'int' })
  tourContentId: number;

  @ManyToOne(() => TourContent, (tourContent) => tourContent.holidaysOfWeek)
  @JoinColumn({ name: 'tour_content_id' })
  tourContent: TourContent;
}
