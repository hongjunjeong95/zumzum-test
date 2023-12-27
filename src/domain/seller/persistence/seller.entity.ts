import { Entity, Column, OneToMany } from 'typeorm';
import { TourContent } from 'src/domain/tour-content/persistence/tour-content.entity';
import { BaseEntity } from '@common/entity/BaseEntity';

@Entity()
export class Seller extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @OneToMany(() => TourContent, (tourContent) => tourContent.seller)
  tourContents: TourContent[];
}
