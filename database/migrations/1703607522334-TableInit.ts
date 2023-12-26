import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableInit1703607522334 implements MigrationInterface {
  name = 'TableInit1703607522334';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`seller\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, INDEX \`IDX_fdb07f79180ddd766cdaab6d23\` (\`deletedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tour_content\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`content\` varchar(255) NOT NULL, \`holiday_of_week\` enum ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'), \`seller_id\` int NOT NULL, INDEX \`IDX_4f0b372c5dfd293b85a7232d80\` (\`deletedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tour\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`date\` timestamp NOT NULL, \`is_holiday\` tinyint NOT NULL COMMENT '특정 날이 휴일인지 여부', \`max_reservations_per_day\` int NOT NULL COMMENT '하루 최대 자동 예약 허용 수' DEFAULT '5', \`tour_content_id\` int NOT NULL, INDEX \`IDX_5f04ee01aa90b1af5ee5b565ab\` (\`deletedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`reservation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`token\` varchar(255) NOT NULL COMMENT '승인의 결과값이다. 이 값으로 판매자는 고객의 예약 여부를 확인한다. 한 번 승인한 토큰은 재사용이 불가능하다.', \`is_approved\` tinyint NOT NULL COMMENT '토큰의 승인 여부다. true가 한 번이라도 되었다면 token은 재사용이 불가능하다.' DEFAULT 0, \`is_cancelled\` tinyint NOT NULL COMMENT '예약 취소 여부다.' DEFAULT 0, \`tour_id\` int NOT NULL, \`customer_id\` int NOT NULL, INDEX \`IDX_862a28ede78a4769b44309760c\` (\`deletedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, INDEX \`IDX_28c3685247469315fb7602cb84\` (\`deletedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tour_content\` ADD CONSTRAINT \`FK_094a0b41385217ec219dc8efe98\` FOREIGN KEY (\`seller_id\`) REFERENCES \`seller\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tour\` ADD CONSTRAINT \`FK_a47415b036871618f4f0a9c0908\` FOREIGN KEY (\`tour_content_id\`) REFERENCES \`tour_content\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_8fe19921b86848d5c1818bd9220\` FOREIGN KEY (\`tour_id\`) REFERENCES \`tour\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_ffb0414171d826ee21f993f17fe\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_ffb0414171d826ee21f993f17fe\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_8fe19921b86848d5c1818bd9220\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tour\` DROP FOREIGN KEY \`FK_a47415b036871618f4f0a9c0908\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tour_content\` DROP FOREIGN KEY \`FK_094a0b41385217ec219dc8efe98\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_28c3685247469315fb7602cb84\` ON \`customer\``,
    );
    await queryRunner.query(`DROP TABLE \`customer\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_862a28ede78a4769b44309760c\` ON \`reservation\``,
    );
    await queryRunner.query(`DROP TABLE \`reservation\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_5f04ee01aa90b1af5ee5b565ab\` ON \`tour\``,
    );
    await queryRunner.query(`DROP TABLE \`tour\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_4f0b372c5dfd293b85a7232d80\` ON \`tour_content\``,
    );
    await queryRunner.query(`DROP TABLE \`tour_content\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_fdb07f79180ddd766cdaab6d23\` ON \`seller\``,
    );
    await queryRunner.query(`DROP TABLE \`seller\``);
  }
}
