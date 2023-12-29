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
