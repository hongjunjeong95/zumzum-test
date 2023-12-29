import { Test, TestingModule } from '@nestjs/testing';

import { MockRepository } from '../mocks/types';
import { ReservationMockRepository } from '../mocks/repositories';
import {
  AlreadyTokenUsedException,
  HolidayReservationException,
  LateCancelReservationException,
} from '@common/filters/server-exception';
import {
  ReservationRepositoryInterface,
  ReservationRepositoryInterfaceToken,
} from '@domain/reservation/persistence/repository/reservation.repository.interface';
import { ReservationService } from '@domain/reservation/service/reservation.service';
import {
  getMockReservation,
  getMockTour,
} from '../../test/mocks/fixtures/seller';
import { WeekEnum } from '@domain/tour/persistence/tour.entity';
import nanoid from 'nanoid';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DateUtils } from '@helpers/date.utils';

describe(ReservationService.name, () => {
  let service: ReservationService;
  let reservationRepository: MockRepository<ReservationRepositoryInterface>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ReservationService,
        {
          provide: ReservationRepositoryInterfaceToken,
          useValue: ReservationMockRepository(),
        },
      ],
    }).compile();

    service = module.get(ReservationService);
    reservationRepository = module.get(ReservationRepositoryInterfaceToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('reserve', () => {
    it(`returns ${HolidayReservationException.name} when the tour is a holiday`, async () => {
      const tour = getMockTour();
      tour.isHoliday = true;
      const customerId = 1;
      const holidaysOfWeek = [WeekEnum.SUNDAY];

      try {
        await service.reserve(tour, customerId, holidaysOfWeek);
      } catch (error: any) {
        expect(error).toBeInstanceOf(HolidayReservationException);
      }
    });

    it(`returns ${HolidayReservationException.name} when the tour is on holidays of week`, async () => {
      const tour = getMockTour();
      const customerId = 1;
      const holidaysOfWeek = [WeekEnum.SUNDAY, WeekEnum.MONDAY];

      try {
        await service.reserve(tour, customerId, holidaysOfWeek);
      } catch (error: any) {
        expect(error).toBeInstanceOf(HolidayReservationException);
      }
    });

    it(`passes successfully`, async () => {
      const tour = getMockTour();
      const reservation = await getMockReservation();
      const customerId = 1;
      const holidaysOfWeek = [WeekEnum.SATURDAY, WeekEnum.MONDAY];
      reservationRepository.getCurrentReservationCount?.mockResolvedValue(5);
      reservationRepository.customSave.mockResolvedValue(reservation);

      await service.reserve(tour, customerId, holidaysOfWeek);

      expect(
        reservationRepository.getCurrentReservationCount,
      ).toHaveBeenCalled();
      expect(reservationRepository.customSave).toHaveBeenCalled();
    });
  });

  describe('isApproved', () => {
    it(`is not approved when tour's max reservation is already reached`, async () => {
      const tourId = 1;
      const maxReservation = 5;
      reservationRepository.getCurrentReservationCount?.mockResolvedValue(5);

      const result = await service.isApproved(tourId, maxReservation);

      expect(result).toBe(false);
    });

    it(`is approved when tour's max reservation is not yet reached`, async () => {
      const tourId = 1;
      const maxReservation = 5;
      reservationRepository.getCurrentReservationCount?.mockResolvedValue(4);

      const result = await service.isApproved(tourId, maxReservation);

      expect(result).toBe(true);
    });
  });

  describe('getToken', () => {
    it(`returns null when a reservation is not approved`, async () => {
      const isApproved = false;

      const result = await service.getToken(isApproved);

      expect(result).toBe(null);
    });

    it(`returns a token when a reservation is approved`, async () => {
      const isApproved = true;
      reservationRepository.getCurrentReservationCount?.mockResolvedValue(4);
      const token = 'lsakdfwielfjsaidfl';
      nanoid.nanoid = jest.fn((num: number) => {
        return token;
      });

      const result = await service.getToken(isApproved);

      expect(result).toBe(token);
    });
  });

  describe('approveReservation', () => {
    it(`returns ${NotFoundException.name} when can't find a reservation`, async () => {
      const reservationId = 1;
      reservationRepository.findOneByIdOrFail?.mockRejectedValue(
        new NotFoundException("Can't find a reservation by reservationId"),
      );

      try {
        await service.approveReservation(reservationId);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it(`passes successfully`, async () => {
      const reservation = await getMockReservation();
      reservationRepository.findOneByIdOrFail.mockResolvedValue(reservation);
      const token = 'laksdjlkasdflksadflwei';
      service.getToken = jest.fn(async (isApproved: boolean) => {
        return token;
      });
      reservation.token = await service.getToken(true);
      reservationRepository.customSave.mockResolvedValue(reservation);
      const reservationId = 1;

      await service.approveReservation(reservationId);

      expect(reservationRepository.findOneByIdOrFail).toHaveBeenCalled();
      expect(reservationRepository.customSave).toHaveBeenCalled();
      expect(service.getToken).toHaveBeenCalled();
    });
  });

  describe('approveToken', () => {
    it(`returns ${NotFoundException.name} when can't find a reservation by token`, async () => {
      const token = 'alskdfwoiejfsaildjflaisdf';
      reservationRepository.findOneByTokenOrFail?.mockRejectedValue(
        new NotFoundException("Can't find a reservation by token"),
      );

      try {
        await service.approveToken(token);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it(`returns ${AlreadyTokenUsedException.name} when a reservation's token is already used`, async () => {
      const token = 'alskdfwoiejfsaildjflaisdf';
      const reservation = getMockReservation();
      reservation.isTokenUsed = true;
      reservationRepository.findOneByTokenOrFail?.mockResolvedValue(
        reservation,
      );

      try {
        await service.approveToken(token);
      } catch (error: any) {
        expect(error).toBeInstanceOf(AlreadyTokenUsedException);
      }
    });

    it(`passes successfully`, async () => {
      const token = 'alskdfwoiejfsaildjflaisdf';
      const reservation = getMockReservation();
      reservation.isTokenUsed = false;
      reservationRepository.findOneByTokenOrFail?.mockResolvedValue(
        reservation,
      );
      reservationRepository.customSave?.mockResolvedValue(reservation);

      await service.approveToken(token);

      expect(reservationRepository.findOneByTokenOrFail).toHaveBeenCalled();
      expect(reservationRepository.customSave).toHaveBeenCalled();
    });
  });

  describe('cancelReservation', () => {
    it(`returns ${NotFoundException.name} when can't find a reservation by reservationId`, async () => {
      const reservationId = 1;
      const customerId = 1;
      reservationRepository.findOneByIdWithTourOrFail?.mockRejectedValue(
        new NotFoundException("Can't find a reservation by reservationId"),
      );

      try {
        await service.cancelReservation(reservationId, customerId);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it(`returns ${UnauthorizedException.name} when a forbidden customer acces the reservation`, async () => {
      const reservationId = 1;
      const customerId = 2;
      const reservation = getMockReservation();
      reservationRepository.findOneByIdWithTourOrFail?.mockResolvedValue(
        reservation,
      );

      try {
        await service.cancelReservation(reservationId, customerId);
      } catch (error: any) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    it(`returns ${LateCancelReservationException.name} when too late to cancel the reservation`, async () => {
      const reservationId = 1;
      const customerId = 1;
      const reservation = getMockReservation();
      reservation.tour = getMockTour();
      reservationRepository.findOneByIdWithTourOrFail?.mockResolvedValue(
        reservation,
      );
      DateUtils.getDaysUntilDate = jest.fn((date: Date) => {
        return 2;
      });

      try {
        await service.cancelReservation(reservationId, customerId);
      } catch (error: any) {
        console.log(error);
        expect(error).toBeInstanceOf(LateCancelReservationException);
      }
    });

    it(`passes successfully`, async () => {
      const reservationId = 1;
      const customerId = 1;
      const reservation = getMockReservation();
      reservation.tour = getMockTour();
      reservationRepository.findOneByIdWithTourOrFail?.mockResolvedValue(
        reservation,
      );
      DateUtils.getDaysUntilDate = jest.fn((date: Date) => {
        return 3;
      });

      await service.cancelReservation(reservationId, customerId);

      expect(
        reservationRepository.findOneByIdWithTourOrFail,
      ).toHaveBeenCalled();
      expect(reservationRepository.customSave).toHaveBeenCalled();
    });
  });
});
