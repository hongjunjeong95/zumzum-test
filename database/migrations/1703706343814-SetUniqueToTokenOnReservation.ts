import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetUniqueToTokenOnReservation1703706343814
  implements MigrationInterface
{
  name = 'SetUniqueToTokenOnReservation1703706343814';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`reservation\` ADD UNIQUE INDEX \`IDX_0be729d3cfce25f3f075286a11\` (\`token\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`reservation\` DROP INDEX \`IDX_0be729d3cfce25f3f075286a11\``,
    );
  }
}
