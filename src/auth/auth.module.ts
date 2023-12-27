import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';

import { JwtAccessTokenStrategy } from './jwt-access.strategy';
import JwtConfig from '@common/config/variables/jwt.config';
import { SellerAuthController } from './controller/seller.auth.controller';
import { SellerRepositoryModule } from 'src/domain/seller/persistence/repository/seller.repository.module';
import { CustomerAuthController } from './controller/customer.auth.controller';
import { CustomerRepositoryModule } from 'src/domain/customer/persistence/repository/customer.repository.module';
import { TokenProvider } from './service/token-provider';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    PassportModule.registerAsync({
      useFactory: async (config: ConfigType<typeof JwtConfig>) => ({
        defaultStrategy: config.accessTokenDefaultStrategy,
        session: config.accessTokenSecretKey,
      }),
      inject: [JwtConfig.KEY],
    }),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigType<typeof JwtConfig>) => ({
        secret: config.accessTokenSecretKey,
        signOptions: { expiresIn: config.accessTokenExpireDuration },
      }),
      inject: [JwtConfig.KEY],
    }),
    SellerRepositoryModule,
    CustomerRepositoryModule,
  ],
  controllers: [SellerAuthController, CustomerAuthController],
  providers: [JwtAccessTokenStrategy, AuthService, TokenProvider],
})
export class AuthModule {}
