import { Reservation } from '../reservation.entity';

export const ReservationRepositoryInterfaceToken = Symbol(
  'ReservationRepositoryInterface',
);
export interface ReservationRepositoryInterface {
  customSave(entity: Reservation): Promise<Reservation>;
  findByIdOrFail(id: number): Promise<Reservation>;
}
