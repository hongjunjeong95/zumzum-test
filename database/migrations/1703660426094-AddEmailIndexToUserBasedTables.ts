import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailIndexToUserBasedTables1703660426094 implements MigrationInterface {
    name = 'AddEmailIndexToUserBasedTables1703660426094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`IDX_fdb2f3ad8115da4c7718109a6e\` ON \`customer\` (\`email\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_1f677314b76e057b56c48042ac\` ON \`seller\` (\`email\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_1f677314b76e057b56c48042ac\` ON \`seller\``);
        await queryRunner.query(`DROP INDEX \`IDX_fdb2f3ad8115da4c7718109a6e\` ON \`customer\``);
    }

}
