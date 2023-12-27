import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConstraintsToHolidayOfWeek1703686980086 implements MigrationInterface {
    name = 'AddConstraintsToHolidayOfWeek1703686980086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`IDX_9aac86ff187f819d5cbd639b14\` ON \`holiday_of_week\` (\`week\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_6c37f8ec65f5ecd5b2544f3ab9\` ON \`holiday_of_week\` (\`week\`, \`tour_content_id\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_6c37f8ec65f5ecd5b2544f3ab9\` ON \`holiday_of_week\``);
        await queryRunner.query(`DROP INDEX \`IDX_9aac86ff187f819d5cbd639b14\` ON \`holiday_of_week\``);
    }

}
