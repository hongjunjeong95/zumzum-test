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
}
