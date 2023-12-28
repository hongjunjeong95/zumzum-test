import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import AppConfig from './variables/app.config';
import DbConfig from './variables/db.config';
import JwtConfig from './variables/jwt.config';
import CacheConfig from './variables/cache.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, DbConfig, JwtConfig, CacheConfig],
      envFilePath: '.env.development',
    }),
  ],
})
export class ConfigModule {}
