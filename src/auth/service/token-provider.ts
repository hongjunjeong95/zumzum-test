import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable } from '@nestjs/common';
import JwtConfig from '@common/config/variables/jwt.config';
import { ConfigType } from '@nestjs/config';
import { UserRole } from '@common/entity/base-user-entity';

@Injectable()
export class TokenProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(JwtConfig.KEY)
    private jwtConfig: ConfigType<typeof JwtConfig>,
  ) {}

  createAuthToken(claim: JWTClaim): string {
    const payload = {
      iss: this.jwtConfig.issuer,
      sub: claim.userId.toString(),
      email: claim.email,
      name: claim.name,
      role: claim.role,
    };
    return this.jwtService.sign(payload, {
      secret: this.jwtConfig.accessTokenSecretKey,
      expiresIn: this.jwtConfig.accessTokenExpireDuration,
    });
  }
}

export type JWTClaim = {
  userId: number;
  name: string;
  email: string;
  role: UserRole;
};

export type JWTPayload = {
  iss: string;
  exp: string;
  sub: string;
  email: string;
  name: string;
  role: UserRole;
};
