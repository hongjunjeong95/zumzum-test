import { envRequired } from '@helpers/env-required';
import { registerAs } from '@nestjs/config';

const DbConfig = registerAs('db', () => ({
  host: envRequired('DB_HOST'),
  port: parseInt(envRequired('DB_PORT')),
  username: envRequired('DB_USERNAME'),
  password: envRequired('DB_PASSWORD'),
  database: envRequired('DB_DATABASE'),
}));

export default DbConfig;
