import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsTokenUsedColumnAndDropIsApprovedOnReservationTable1703704794684
  implements MigrationInterface
{
  name = 'AddIsTokenUsedColumnAndDropIsApprovedOnReservationTable1703704794684';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tour\` CHANGE \`max_reservations_per_day\` \`max_reservation\` int NOT NULL COMMENT '하루 최대 자동 예약 허용 수' DEFAULT '5'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` DROP COLUMN \`is_approved\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` ADD \`is_toekn_used\` tinyint NOT NULL COMMENT '토큰의 사용 여부다. true가 한 번이라도 되었다면 token은 재사용이 불가능하다.' DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` CHANGE \`token\` \`token\` varchar(255) NULL COMMENT '승인의 결과값이다. 이 값으로 판매자는 고객의 예약 여부를 확인한다. 한 번 승인한 토큰은 재사용이 불가능하다.'`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_b7d6d9a67af026c73a8f7132ed\` ON \`tour\` (\`tour_content_id\`, \`week\`, \`date\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_3a0e1254981e4cb6aa1100904b\` ON \`tour\` (\`tour_content_id\`, \`locale_date_string\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_3a0e1254981e4cb6aa1100904b\` ON \`tour\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b7d6d9a67af026c73a8f7132ed\` ON \`tour\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` CHANGE \`token\` \`token\` varchar(255) NOT NULL COMMENT '승인의 결과값이다. 이 값으로 판매자는 고객의 예약 여부를 확인한다. 한 번 승인한 토큰은 재사용이 불가능하다.'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` DROP COLUMN \`is_toekn_used\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` ADD \`is_approved\` tinyint NOT NULL COMMENT '토큰의 승인 여부다. true가 한 번이라도 되었다면 token은 재사용이 불가능하다.' DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tour\` CHANGE \`max_reservation\` \`max_reservations_per_day\` int NOT NULL COMMENT '하루 최대 자동 예약 허용 수' DEFAULT '5'`,
    );
  }
}
