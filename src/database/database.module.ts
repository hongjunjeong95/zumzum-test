import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const isProduction =
          configService.get<string>('NODE_ENV') === 'production';
        return {
          type: 'mysql',
          host: configService.get<string>('db.host'),
          port: configService.get<number>('db.port'),
          username: configService.get<string>('db.username'),
          password: configService.get<string>('db.password'),
          database: configService.get<string>('db.database'),

          ssl: isProduction,
          synchronize: false,
          logging: ['warn', 'error'],
          autoLoadEntities: true,
          extra: {
            ...(isProduction
              ? {
                  ssl: {
                    rejectUnauthorized: false,
                  },
                }
              : {}),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
