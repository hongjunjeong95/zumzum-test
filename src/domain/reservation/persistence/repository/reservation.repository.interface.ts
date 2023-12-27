import { Reservation } from '../reservation.entity';

export const ReservationRepositoryInterfaceToken = Symbol(
  'ReservationRepositoryInterface',
);
export interface ReservationRepositoryInterface {
  customSave(entity: Reservation): Promise<Reservation>;
  customSave(entities: Reservation[]): Promise<Reservation[]>;
  findByIdOrFail(id: number): Promise<Reservation>;
  getCurrentReservationCount(tourId: number): Promise<number>;
  findOneByIdOrFail(reservationId: number): Promise<Reservation>;
}
