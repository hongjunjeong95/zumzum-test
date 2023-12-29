import { Test, TestingModule } from '@nestjs/testing';

import { MockRepository, MockService } from '../mocks/types';
import { TourMockRepository } from '../mocks/repositories';
import { TooManyDatesToCreateException } from '@common/filters/server-exception';
import { WeekEnum } from '@domain/tour/persistence/tour.entity';
import { TourService } from '@domain/tour/service/tour.service';
import {
  TourRepositoryInterface,
  TourRepositoryInterfaceToken,
} from '@domain/tour/persistence/repository/tour.repository.interface';
import { CacheService } from '@common/service/cache/cache.service';
import { CacheMockService } from '../../test/mocks/services';
import { getMockTour } from '../../test/mocks/fixtures/seller';
import { NotFoundException } from '@nestjs/common';

describe(TourService.name, () => {
  let service: TourService;
  let tourRepository: MockRepository<TourRepositoryInterface>;
  let cacheService: MockService<CacheService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        TourService,
        {
          provide: TourRepositoryInterfaceToken,
          useValue: TourMockRepository(),
        },
        {
          provide: CacheService,
          useValue: CacheMockService(),
        },
      ],
    }).compile();

    service = module.get(TourService);
    cacheService = module.get(CacheService);
    tourRepository = module.get(TourRepositoryInterfaceToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createEntities', () => {
    it(`returns ${TooManyDatesToCreateException.name} when between start and end of date are too large`, async () => {
      tourRepository.findLastOne.mockResolvedValue(null);
      const localeStartDateString = '1/2/2024';
      const localeEndDateString = '6/29/2024';
      const timezoneOffset = -540;
      const tourContentId = 1;

      try {
        const result = await service.createMany({
          localeEndDateString,
          localeStartDateString,
          timezoneOffset,
          tourContentId,
        });
        expect(result).not.toBeCalled();
      } catch (error: any) {
        expect(error).toBeInstanceOf(TooManyDatesToCreateException);
      }
    });

    it(`returns ${TooManyDatesToCreateException.name} when between start of date and last of date on the database are too large`, async () => {
      const tour = getMockTour();
      tourRepository.findLastOne.mockResolvedValue(tour);
      const localeStartDateString = '1/2/2024';
      const localeEndDateString = '3/29/2024';
      const timezoneOffset = -540;
      const tourContentId = 1;

      try {
        const result = await service.createMany({
          localeEndDateString,
          localeStartDateString,
          timezoneOffset,
          tourContentId,
        });
        expect(result).not.toBeCalled();
      } catch (error: any) {
        expect(error).toBeInstanceOf(TooManyDatesToCreateException);
      }
    });
  });

  describe('createEntities', () => {
    it(`passes successfully`, async () => {
      const tour = getMockTour();
      tourRepository.findLastOne.mockResolvedValue(null);
      const localeStartDateString = '1/2/2024';
      const localeEndDateString = '3/29/2024';
      const timezoneOffset = -540;
      const tourContentId = 1;
      tourRepository.customSave.mockResolvedValue([tour]);

      const result = await service.createMany({
        localeEndDateString,
        localeStartDateString,
        timezoneOffset,
        tourContentId,
      });

      expect(result).toStrictEqual([tour]);
    });
  });

  describe('getAvailableTours', () => {
    it(`returns cached result when redis has a result by a given key`, async () => {
      const tourContentId = 1;
      const targetMonth = 1;
      const holidaysOfWeek = [WeekEnum.SATURDAY, WeekEnum.SUNDAY];
      const tour = getMockTour();
      cacheService.generateCacheKeyForHoliday.mockResolvedValue(
        `availableTours_${tourContentId}_${targetMonth}`,
      );
      cacheService.get.mockResolvedValue([tour]);

      const result = await service.getAvailableTours(
        tourContentId,
        targetMonth,
        holidaysOfWeek,
      );

      expect(result).toStrictEqual([tour]);
    });

    it(`returns empty array when redis and database have no result`, async () => {
      const tourContentId = 1;
      const targetMonth = 1;
      const holidaysOfWeek = [WeekEnum.SATURDAY, WeekEnum.SUNDAY];
      cacheService.generateCacheKeyForHoliday.mockResolvedValue(
        `availableTours_${tourContentId}_${targetMonth}`,
      );
      cacheService.get.mockResolvedValue(undefined);
      tourRepository.findAvailableToursInMonth.mockResolvedValue([]);

      const result = await service.getAvailableTours(
        tourContentId,
        targetMonth,
        holidaysOfWeek,
      );

      expect(result).toStrictEqual([]);
    });

    it(`returns result from database when redis has no result by a given key`, async () => {
      const tourContentId = 1;
      const targetMonth = 1;
      const holidaysOfWeek = [WeekEnum.SATURDAY, WeekEnum.SUNDAY];
      const tour = getMockTour();
      cacheService.generateCacheKeyForHoliday.mockResolvedValue(
        `availableTours_${tourContentId}_${targetMonth}`,
      );
      cacheService.get.mockResolvedValue(undefined);
      tourRepository.findAvailableToursInMonth.mockResolvedValue([tour]);
      cacheService.set.mockResolvedValue(undefined);

      const result = await service.getAvailableTours(
        tourContentId,
        targetMonth,
        holidaysOfWeek,
      );

      expect(result).toStrictEqual([tour]);
    });
  });

  describe('setSpecificHoliday', () => {
    it(`returns ${NotFoundException.name} when can't find a tour by tourContentId and localeDateString`, async () => {
      const tourContentId = 1;
      const localeDateString = '12/23/2023';
      tourRepository.findOneByTourContentIdAndLocaleDateStringOrFail.mockRejectedValue(
        new NotFoundException("Can't find a tour"),
      );

      try {
        const result = await service.setSpecificHoliday(
          tourContentId,
          localeDateString,
        );
        expect(result).not.toBeCalled();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it(`returns empty array when redis and database have no result`, async () => {
      const tourContentId = 1;
      const localeDateString = '12/23/2023';
      const tour = getMockTour();
      tourRepository.findOneByTourContentIdAndLocaleDateStringOrFail.mockResolvedValue(
        tour,
      );
      tourRepository.customSave.mockResolvedValue(tour);
      cacheService.delete.mockResolvedValue(undefined);

      await service.setSpecificHoliday(tourContentId, localeDateString);

      expect(
        tourRepository.findOneByTourContentIdAndLocaleDateStringOrFail,
      ).toHaveBeenCalled();
      expect(tourRepository.customSave).toHaveBeenCalled();
      expect(cacheService.delete).toHaveBeenCalled();
    });
  });
});
