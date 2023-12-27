import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';

import JwtConfig from '@common/config/variables/jwt.config';
import { JWTPayload } from '../service/token-provider';
import { UserRole } from '@common/entity/base-user-entity';
import { jwtConstants } from '../constant';

@Injectable()
export class CustomerJwtStrategy extends PassportStrategy(
  Strategy,
  jwtConstants.JWT_CUSTOMER,
) {
  constructor(
    @Inject(JwtConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof JwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.Authorization;
        },
        (req: Request) => {
          const authHeader = req.get('Authorization');
          if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.split(' ')[1];
          }

          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.accessTokenSecretKey,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JWTPayload): Promise<any> {
    if (payload.role !== UserRole.CUSTOMER) {
      throw new ForbiddenException();
    }

    return {
      id: payload.sub,
      name: payload,
      email: payload.email,
      role: payload.role,
    };
  }
}
