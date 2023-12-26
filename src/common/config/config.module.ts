import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import AppConfig from './variables/app.config';
import DbConfig from './variables/db.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, DbConfig],
      envFilePath: '.env.development',
    }),
  ],
})
export class ConfigModule {}
