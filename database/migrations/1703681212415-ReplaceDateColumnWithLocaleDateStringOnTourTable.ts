import { MigrationInterface, QueryRunner } from "typeorm";

export class ReplaceDateColumnWithLocaleDateStringOnTourTable1703681212415 implements MigrationInterface {
    name = 'ReplaceDateColumnWithLocaleDateStringOnTourTable1703681212415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tour\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`tour\` ADD \`locale_date_string\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tour\` ADD \`timezone_offset\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tour\` CHANGE \`is_holiday\` \`is_holiday\` tinyint NOT NULL COMMENT '특정 날이 휴일인지 여부' DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tour\` CHANGE \`is_holiday\` \`is_holiday\` tinyint NOT NULL COMMENT '특정 날이 휴일인지 여부'`);
        await queryRunner.query(`ALTER TABLE \`tour\` DROP COLUMN \`timezone_offset\``);
        await queryRunner.query(`ALTER TABLE \`tour\` DROP COLUMN \`locale_date_string\``);
        await queryRunner.query(`ALTER TABLE \`tour\` ADD \`date\` timestamp NOT NULL`);
    }

}
