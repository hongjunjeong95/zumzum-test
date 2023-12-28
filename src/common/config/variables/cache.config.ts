import { envRequired } from '@helpers/env-required';
import { registerAs } from '@nestjs/config';

const CacheConfig = registerAs('cache', () => ({
  cacheTtl: parseInt(envRequired('REDIS_TTL', 5)),
  max: parseInt(envRequired('REDIS_MAX', 100)),
  url: envRequired('REDIS_URL'),
}));

export default CacheConfig;
