import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAvatarToUser1774600000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "user"
        ADD COLUMN "avatar" varchar
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "user"
        DROP COLUMN "avatar"
        `);
    }
}