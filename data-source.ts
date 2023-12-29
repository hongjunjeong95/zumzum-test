import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '.env.development') });

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/database/migrations/**/*.js'],
  migrationsTableName: 'migrations',
});
