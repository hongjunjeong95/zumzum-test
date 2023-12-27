import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TourContent } from 'src/domain/tour-content/persistence/tour-content.entity';
import { BaseEntity } from '@common/entity/base-entity';

@Entity()
export class SpecificHoliday extends BaseEntity {
  @Column({ name: 'date', type: 'timestamp' })
  date: Date;

  @Column({ name: 'tour_content_id', type: 'int' })
  tourContentId: number;

  @ManyToOne(() => TourContent, (tourContent) => tourContent.specificHoliday)
  @JoinColumn({ name: 'tour_content_id' })
  tourContent: TourContent;
}
