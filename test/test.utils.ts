import {
  DynamicModule,
  ForwardReference,
  INestApplication,
  Type,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import { initializeTransactionalContext } from 'typeorm-transactional';
import request, { Response } from 'supertest';
import { UserRole } from '@common/entity/base-user-entity';
import { ApiPrefix } from '@common/constant';
import { Customer } from '@domain/customer/persistence/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BCryptUtils } from '@helpers/bcrypt.utils';
import { Seller } from '@domain/seller/persistence/seller.entity';

export class TestUtils {
  public static async createTestApp({
    imports = [],
    providers = [],
  }: {
    imports?: Array<
      Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
    >;
    providers?: any[];
  }): Promise<INestApplication> {
    initializeTransactionalContext();

    const app = await this.createTestingModule({ imports, providers })
      .compile()
      .then((module) => module.createNestApplication());

    return this.attachMiddlewares(app);
  }

  private static createTestingModule({
    imports = [],
    providers = [],
  }: {
    imports?: Array<
      Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
    >;
    providers?: any[];
  }): TestingModuleBuilder {
    const moduleBuilder = Test.createTestingModule({
      imports: [...imports],
      providers: [...providers],
    });

    return moduleBuilder;
  }

  private static attachMiddlewares(app: INestApplication): INestApplication {
    return app //
      .use(cookieParser())
      .useGlobalPipes(
        new ValidationPipe({
          transform: true,
          whitelist: true,
        }),
      );
  }

  public static async loginUser(
    app: INestApplication,
    email: string,
    userRole: UserRole,
  ): Promise<string> {
    const { CUSTOMER_API_V1, SELLER_API_V1 } = ApiPrefix;
    const pathPrefix =
      userRole === UserRole.SELLER ? SELLER_API_V1 : CUSTOMER_API_V1;

    const res = await request(app.getHttpServer())
      .post(`/${pathPrefix}/auth/signin`)
      .send({
        email,
        password: 'password123',
      });

    return this.getAuthToken(res);
  }

  public static getAuthToken(response: Response): string | undefined {
    const authCookie = response.headers['set-cookie'];
    if (authCookie && Array.isArray(authCookie)) {
      const authToken = authCookie
        .map((cookie) => cookie.split(';')[0])
        .find((cookie) => cookie.startsWith('Authorization='));

      if (authToken) {
        return authToken.split('=')[1];
      }
    }

    return undefined;
  }

  public static async createCustomerAndSeller(app: INestApplication) {
    const customer = new Customer();
    customer.name = 'Test Customer';
    customer.email = 'test.customer@example.com';
    customer.password = await BCryptUtils.encrypt('password123');
    await app.get(getRepositoryToken(Customer)).save(customer);

    const seller = new Seller();
    seller.name = 'Test Seller';
    seller.email = 'test.seller@example.com';
    seller.password = await BCryptUtils.encrypt('password123');
    await app.get(getRepositoryToken(Seller)).save(seller);

    return {
      seller,
      customer,
    };
  }
}
