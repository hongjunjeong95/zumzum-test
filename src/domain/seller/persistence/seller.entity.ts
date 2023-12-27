import { Entity, OneToMany } from 'typeorm';
import { BaseUserEntity } from '@common/entity/base-user-entity';
import { TourContent } from '@domain/tour-content/persistence/tour-content.entity';

@Entity()
export class Seller extends BaseUserEntity {
  @OneToMany(() => TourContent, (tourContent) => tourContent.seller)
  tourContents: TourContent[];
}
