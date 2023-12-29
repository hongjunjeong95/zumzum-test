import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { MockRepository, MockService } from '../mocks/types';
import { CacheService } from '@common/service/cache/cache.service';
import { CacheMockService } from '../mocks/services';
import { TourContentService } from '@domain/tour-content/service/tour-content.service';
import {
  TourContentRepositoryInterface,
  TourContentRepositoryInterfaceToken,
} from '@domain/tour-content/persistence/repository/tour-content.repository.interface';
import { TourContentMockRepository } from '../../test/mocks/repositories';
import { WeekEnum } from '@domain/tour/persistence/tour.entity';
import { getMockTourContent } from '../../test/mocks/fixtures/seller';

describe(TourContentService.name, () => {
  let service: TourContentService;
  let tourContentRepository: MockRepository<TourContentRepositoryInterface>;
  let cacheService: MockService<CacheService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        TourContentService,
        {
          provide: TourContentRepositoryInterfaceToken,
          useValue: TourContentMockRepository(),
        },
        {
          provide: CacheService,
          useValue: CacheMockService(),
        },
      ],
    }).compile();

    service = module.get(TourContentService);
    cacheService = module.get(CacheService);
    tourContentRepository = module.get(TourContentRepositoryInterfaceToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('setHolidaysOfWeek', () => {
    it(`returns ${NotFoundException.name} when Can't find a tour content by tourContentId`, async () => {
      tourContentRepository.findOneByIdOrFail.mockRejectedValue(
        new NotFoundException("Can't find a tour content"),
      );
      const tourContentId = 1;
      const weeks = [WeekEnum.SATURDAY, WeekEnum.SUNDAY];

      try {
        const result = await service.setHolidaysOfWeek(tourContentId, weeks);
        expect(result).not.toBeCalled();
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it(`returns empty array when redis and database have no result`, async () => {
      const tourContent = getMockTourContent();
      tourContentRepository.findOneByIdOrFail.mockResolvedValue(tourContent);
      const tourContentId = 1;
      const weeks = [WeekEnum.SATURDAY, WeekEnum.SUNDAY];

      await service.setHolidaysOfWeek(tourContentId, weeks);

      expect(tourContentRepository.findOneByIdOrFail).toHaveBeenCalled();
      expect(tourContentRepository.customSave).toHaveBeenCalled();
      expect(cacheService.delete).toHaveBeenCalled();
    });
  });
});
