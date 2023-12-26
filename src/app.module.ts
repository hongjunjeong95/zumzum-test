import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './common/config/config.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
})
export class AppModule {}
