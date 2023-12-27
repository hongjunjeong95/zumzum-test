import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  synchronize: false,
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/database/migrations/**/*.js'],
  migrationsTableName: 'migrations',
});
