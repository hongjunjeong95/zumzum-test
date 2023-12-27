import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordColumnOnUserBasedTables1703650371496
  implements MigrationInterface
{
  name = 'AddPasswordColumnOnUserBasedTables1703650371496';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD \`password\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`seller\` ADD \`password\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`seller\` DROP COLUMN \`password\``);
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP COLUMN \`password\``,
    );
  }
}
