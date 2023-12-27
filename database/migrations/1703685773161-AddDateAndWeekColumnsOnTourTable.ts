import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDateAndWeekColumnsOnTourTable1703685773161 implements MigrationInterface {
    name = 'AddDateAndWeekColumnsOnTourTable1703685773161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tour\` ADD \`date\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tour\` ADD \`week\` enum ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tour\` DROP COLUMN \`week\``);
        await queryRunner.query(`ALTER TABLE \`tour\` DROP COLUMN \`date\``);
    }

}
