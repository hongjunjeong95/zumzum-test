import { envRequired } from '@helpers/env-required';
import { registerAs } from '@nestjs/config';

const JwtConfig = registerAs('jwt', () => ({
  issuer: envRequired('ISSUER'),
  accessTokenSecretKey: envRequired('JWT_ACCESS_TOKEN_SECRET'),
  accessTokenDefaultStrategy: envRequired('JWT_ACCESS_TOKEN_DEFAULT_STRATEGY'),
  accessTokenSession: Boolean(envRequired('JWT_ACCESS_TOKEN_SESSION')),
  accessTokenExpireDuration: parseInt(
    envRequired('JWT_ACCESS_TOKEN_EXPIRE_DURATION'),
  ),
}));

export default JwtConfig;
