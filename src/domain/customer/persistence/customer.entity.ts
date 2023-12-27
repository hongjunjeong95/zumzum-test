import { BaseUserEntity } from '@common/entity/base-user-entity';
import { Reservation } from '@domain/reservation/persistence/reservation.entity';
import { Entity, OneToMany } from 'typeorm';

@Entity()
export class Customer extends BaseUserEntity {
  @OneToMany(() => Reservation, (reservation) => reservation.customer)
  reservations: Reservation[];
}
