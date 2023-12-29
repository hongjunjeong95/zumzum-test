import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { AuthModule } from './auth/auth.module';
import { FiltersModule } from '@common/filters/filters.module';
import { DomainModule } from '@domain/domain.module';

import JwtConfig from '@common/config/variables/jwt.config';
import CacheConfig from '@common/config/variables/cache.config';
import TestDbConfig from '@common/config/variables/test.db.config';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [TestDbConfig, JwtConfig, CacheConfig],
      envFilePath: '.test.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          name: 'testDb',
          type: 'mysql',
          host: configService.get('TEST_DB_HOST'),
          port: configService.get('TEST_DB_PORT'),
          username: configService.get('TEST_DB_USERNAME'),
          password: configService.get('TEST_DB_PASSWORD'),
          database: configService.get('TEST_DB_DATABASE'),
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
      async dataSourceFactory(option) {
        if (!option) throw new Error('Invalid options passed');
        return addTransactionalDataSource(new DataSource(option));
      },
    }),
    AuthModule,
    FiltersModule,
    DomainModule,
  ],
})
export class TestAppModule {}
