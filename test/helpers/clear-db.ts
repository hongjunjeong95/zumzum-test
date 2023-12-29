import { CacheService } from '@common/service/cache/cache.service';
import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';

export async function clearDB(app: INestApplication) {
  const dataSource = app.get<DataSource>(DataSource);
  const entities = dataSource.entityMetadatas;
  for (const entity of entities) {
    const repository = dataSource.getRepository(entity.name);
    await repository.query(`DELETE FROM ${entity.tableName};`);
  }
}

export async function clearCache(app: INestApplication) {
  const cacheService = app.get<CacheService>(CacheService);
  await cacheService.reset();
}
