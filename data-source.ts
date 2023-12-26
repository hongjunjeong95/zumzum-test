import { ConfigService } from '@nestjs/config';
import { Customer } from 'src/domain/customer/persistence/customer.entity';
import { Reservation } from 'src/domain/reservation/persistence/reservation.entity';
import { Seller } from 'src/domain/seller/persistence/seller.entity';
import { TourContent } from 'src/domain/tour-content/persistence/tour-content.entity';
import { Tour } from 'src/domain/tour/persistence/tour.entity';
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
  entities: [Seller, TourContent, Tour, Customer, Reservation],
  migrations: ['dist/database/migrations/**/*.js'],
  migrationsTableName: 'migrations',
});
