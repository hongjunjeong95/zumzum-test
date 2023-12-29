import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Seller } from '@domain/seller/persistence/seller.entity';
import { TestUtils } from '../test.utils';
import { TestAppModule } from '../../src/test.app.module';
import { clearCache, clearDB } from '../helpers/clear-db';
import { UserRole } from '@common/entity/base-user-entity';
import { ApiPrefix } from '@common/constant';
import { TourContent } from '@domain/tour-content/persistence/tour-content.entity';
import {
  getMockSeller,
  getMockTour,
  getMockTourContent,
} from '../../test/mocks/fixtures/fixtures';
import { CacheService } from '@common/service/cache/cache.service';
import { Tour } from '@domain/tour/persistence/tour.entity';

describe('CustomerTourController', () => {
  let app: INestApplication;
  let sellerRepository: Repository<Seller>;
  let tourContentRepository: Repository<TourContent>;
  let tourRepository: Repository<Tour>;
  let cacheService: CacheService;
  let customerToken: string;

  beforeAll(async () => {
    app = await TestUtils.createTestApp({ imports: [TestAppModule] });
    await app.init();

    sellerRepository = app.get(getRepositoryToken(Seller));
    tourContentRepository = app.get(getRepositoryToken(TourContent));
    tourRepository = app.get(getRepositoryToken(Tour));
    cacheService = app.get(CacheService);
  });

  afterEach(async () => {
    await Promise.all([clearDB(app), clearCache(app)]);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/customer-api/v1/tours (GET)', () => {
    it('should get cached result', async () => {
      const seller = await getMockSeller();
      await sellerRepository.save(seller);
      const tourContent = getMockTourContent();
      await tourContentRepository.save(tourContent);

      const { customer } = await TestUtils.createCustomerAndSeller(app);
      customerToken = await TestUtils.loginUser(
        app,
        customer.email,
        UserRole.CUSTOMER,
      );

      const query = { targetMonth: 12, tourContentId: 1 };
      const cacheKey = cacheService.generateCacheKeyForHoliday(
        query.tourContentId,
        query.targetMonth,
      );
      const tour = getMockTour();
      cacheService.set(cacheKey, [tour]);

      const response = await request(app.getHttpServer())
        .get(`/${ApiPrefix.CUSTOMER_API_V1}/tours`)
        .query(query)
        .set('Cookie', [`Authorization=${customerToken}`]);
      response.body.data.tours[0].date = new Date(
        response.body.data.tours[0].date,
      );

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toStrictEqual({
        message: null,
        status: 'SUCCESS',
        data: {
          tours: [tour].map((tour) => ({
            id: tour.id,
            date: tour.date,
            localeDateString: tour.localeDateString,
            timezoneOffset: tour.timezoneOffset,
            week: tour.week,
            isHoliday: tour.isHoliday,
            maxReservation: tour.maxReservation,
            tourContentId: tour.tourContentId,
          })),
        },
      });
    });

    it('should returns tours on db', async () => {
      const seller = await getMockSeller();
      await sellerRepository.save(seller);
      const tourContent = getMockTourContent();
      await tourContentRepository.save(tourContent);
      const tour = getMockTour();
      await tourRepository.save(tour);
      const query = { targetMonth: 12, tourContentId: 1 };
      const { customer } = await TestUtils.createCustomerAndSeller(app);
      customerToken = await TestUtils.loginUser(
        app,
        customer.email,
        UserRole.CUSTOMER,
      );

      const response = await request(app.getHttpServer())
        .get(`/${ApiPrefix.CUSTOMER_API_V1}/tours`)
        .query(query)
        .set('Cookie', [`Authorization=${customerToken}`]);
      response.body.data.tours[0].date = new Date(
        response.body.data.tours[0].date,
      );

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toStrictEqual({
        message: null,
        status: 'SUCCESS',
        data: {
          tours: [tour].map((tour) => ({
            id: tour.id,
            date: tour.date,
            localeDateString: tour.localeDateString,
            timezoneOffset: tour.timezoneOffset,
            week: tour.week,
            isHoliday: tour.isHoliday,
            maxReservation: tour.maxReservation,
            tourContentId: tour.tourContentId,
          })),
        },
      });
    });
  });
});
