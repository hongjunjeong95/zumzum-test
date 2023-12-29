import { envRequired } from '@helpers/env-required';
import { registerAs } from '@nestjs/config';

const TestDbConfig = registerAs('db', () => ({
  host: envRequired('TEST_DB_HOST'),
  port: parseInt(envRequired('TEST_DB_PORT')),
  username: envRequired('TEST_DB_USERNAME'),
  password: envRequired('TEST_DB_PASSWORD'),
  database: envRequired('TEST_DB_DATABASE'),
}));

export default TestDbConfig;
