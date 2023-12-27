import { Entity, OneToMany } from 'typeorm';
import { TourContent } from 'src/domain/tour-content/persistence/tour-content.entity';
import { BaseUserEntity } from '@common/entity/base-user-entity';

@Entity()
export class Seller extends BaseUserEntity {
  @OneToMany(() => TourContent, (tourContent) => tourContent.seller)
  tourContents: TourContent[];
}
