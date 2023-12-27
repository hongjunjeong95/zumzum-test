import { BaseEntity } from '@common/entity/base-entity';
import { Customer } from '@domain/customer/persistence/customer.entity';
import { Tour } from '@domain/tour/persistence/tour.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Reservation extends BaseEntity {
  @Column({
    name: 'token',
    comment:
      '승인의 결과값이다. 이 값으로 판매자는 고객의 예약 여부를 확인한다. 한 번 승인한 토큰은 재사용이 불가능하다.',
  })
  token: string;

  @Column({
    name: 'is_approved',
    default: false,
    comment:
      '토큰의 승인 여부다. true가 한 번이라도 되었다면 token은 재사용이 불가능하다.',
  })
  isApproved: boolean;

  @Column({
    name: 'is_cancelled',
    default: false,
    comment: '예약 취소 여부다.',
  })
  isCancelled: boolean;

  @Column({ name: 'tour_id', type: 'int' })
  tourId: number;

  @ManyToOne(() => Tour, (tour) => tour.reservations)
  @JoinColumn({ name: 'tour_id' })
  tour: Tour;

  @Column({ name: 'customer_id', type: 'int' })
  customerId: number;

  @ManyToOne(() => Customer, (customer) => customer.reservations)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
