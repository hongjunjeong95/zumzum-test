import { BaseEntity } from '@common/entity/BaseEntity';
import { Reservation } from 'src/domain/reservation/persistence/reservation.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class Customer extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email' })
  email: string;

  @OneToMany(() => Reservation, (reservation) => reservation.customer)
  reservations: Reservation[];
}
