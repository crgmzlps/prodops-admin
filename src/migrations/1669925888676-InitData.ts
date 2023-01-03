import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitData1669925888676 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users (name, email, salt, key) values ('john doe', 'john@doe.com', 'b04865fe-4ec7-412e-b890-ce0494879269','c73564d392a9727b883a941e766f1bc4fae59f05361bc8111d1bbf6d69b4fd3f3e8a7ea57ab50271bb117a21e179ce58522793d962df8cb1a57b453e47b74e4f')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM users WHERE email like 'john@doe.com'`,
    );
  }
}
