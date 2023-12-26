import { Entity, Column, OneToMany } from 'typeorm';
import { TourContent } from 'src/domain/tour-content/persistence/tour-content.entity';
import { BaseEntity } from '@common/entity/BaseEntity';

@Entity()
export class Seller extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email' })
  email: string;

  @OneToMany(() => TourContent, (tourContent) => tourContent.seller)
  tourContents: TourContent[];
}
