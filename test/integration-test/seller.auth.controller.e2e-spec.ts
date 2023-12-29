import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';

import { Seller } from '@domain/seller/persistence/seller.entity';
import { ApiResponse } from '@common/dto/api-response.dto';
import { TestUtils } from '../test.utils';
import { TestAppModule } from '../../src/test.app.module';
import { clearDB } from '../helpers/clear-db';
import { BCryptUtils } from '@helpers/bcrypt.utils';

describe('SellerAuthController', () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;
  let sellerRepository: Repository<Seller>;

  beforeAll(async () => {
    app = await TestUtils.createTestApp({ imports: [TestAppModule] });
    await app.init();

    sellerRepository = app.get(getRepositoryToken(Seller));
    queryRunner = app.get<DataSource>(DataSource).createQueryRunner();
    await queryRunner.connect();
  });

  afterEach(async () => {
    await clearDB(app);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/seller-api/v1/auth/signup (POST)', () => {
    it('should sign up a new seller', async () => {
      const signUpDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      const response = await request(app.getHttpServer())
        .post('/seller-api/v1/auth/signup')
        .send(signUpDto)
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual(ApiResponse.success(null));
      const seller = await sellerRepository.findOne({
        where: {
          name: signUpDto.name,
        },
      });

      expect(seller.name).toEqual(signUpDto.name);
    });
  });

  describe('/seller-api/v1/auth/signin (POST)', () => {
    it('should sign in an existing seller and return an auth token', async () => {
      const seller = new Seller();
      seller.name = 'Test Seller';
      seller.email = 'test.seller@example.com';
      seller.password = await BCryptUtils.encrypt('password123');
      await sellerRepository.save(seller);
      const signInDto = {
        email: 'test.seller@example.com',
        password: 'password123',
      };

      const response = await request(app.getHttpServer())
        .post('/seller-api/v1/auth/signin')
        .send(signInDto)
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual(ApiResponse.success(null));
      expect(response.header['set-cookie']).toBeDefined();
    });
  });
});
