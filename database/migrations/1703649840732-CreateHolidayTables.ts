import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHolidayTables1703649840732 implements MigrationInterface {
  name = 'CreateHolidayTables1703649840732';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`holiday_of_week\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`week\` enum ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday') NULL, \`tour_content_id\` int NOT NULL, INDEX \`IDX_3d92e0062fded6aff434ff3080\` (\`deletedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`specific_holiday\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`date\` timestamp NOT NULL, \`tour_content_id\` int NOT NULL, INDEX \`IDX_130f4d3cd448f529635bd1d666\` (\`deletedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tour_content\` DROP COLUMN \`holiday_of_week\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`holiday_of_week\` ADD CONSTRAINT \`FK_c5769c8626daaa56cdcfe987a9c\` FOREIGN KEY (\`tour_content_id\`) REFERENCES \`tour_content\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`specific_holiday\` ADD CONSTRAINT \`FK_2f928dcdd6c0d9f6c55c00babcb\` FOREIGN KEY (\`tour_content_id\`) REFERENCES \`tour_content\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`specific_holiday\` DROP FOREIGN KEY \`FK_2f928dcdd6c0d9f6c55c00babcb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`holiday_of_week\` DROP FOREIGN KEY \`FK_c5769c8626daaa56cdcfe987a9c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tour_content\` ADD \`holiday_of_week\` enum ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday') NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_130f4d3cd448f529635bd1d666\` ON \`specific_holiday\``,
    );
    await queryRunner.query(`DROP TABLE \`specific_holiday\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_3d92e0062fded6aff434ff3080\` ON \`holiday_of_week\``,
    );
    await queryRunner.query(`DROP TABLE \`holiday_of_week\``);
  }
}
