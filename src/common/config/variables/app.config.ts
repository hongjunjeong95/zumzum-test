import { envRequired } from '@helpers/env-required';
import { registerAs } from '@nestjs/config';

const AppConfig = registerAs('app', () => ({
  port: parseInt(envRequired('PORT', 3100)),
}));

export default AppConfig;
