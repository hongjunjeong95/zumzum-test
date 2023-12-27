import { BaseEntity } from '@common/entity/BaseEntity';
import { Reservation } from 'src/domain/reservation/persistence/reservation.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class Customer extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @OneToMany(() => Reservation, (reservation) => reservation.customer)
  reservations: Reservation[];
}
