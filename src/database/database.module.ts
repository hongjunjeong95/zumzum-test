import DbConfig from '@common/config/variables/db.config';
import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigType<typeof DbConfig>) => {
        const isProduction = process.env.NODE_ENV === 'production';
        return {
          type: 'mysql',
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          database: config.database,

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
      inject: [DbConfig.KEY],
      async dataSourceFactory(option) {
        if (!option) throw new Error('Invalid options passed');
        return addTransactionalDataSource(new DataSource(option));
      },
    }),
  ],
})
export class DatabaseModule {}
