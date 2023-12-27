import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@common/entity/BaseEntity';
import { TourContent } from 'src/domain/tour-content/persistence/tour-content.entity';

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
