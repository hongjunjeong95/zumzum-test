import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHolidaysOfWeekColumnOnTourContentTable1703746456390
  implements MigrationInterface
{
  name = 'AddHolidaysOfWeekColumnOnTourContentTable1703746456390';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tour_content\` ADD \`holidays_of_week\` text NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tour_content\` DROP COLUMN \`holidays_of_week\``,
    );
  }
}
