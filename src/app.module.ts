import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './common/config/config.module';
import { AuthModule } from './auth/auth.module';
import { FiltersModule } from '@common/filters/filters.module';
import { DomainModule } from '@domain/domain.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    FiltersModule,
    DomainModule,
  ],
})
export class AppModule {}
