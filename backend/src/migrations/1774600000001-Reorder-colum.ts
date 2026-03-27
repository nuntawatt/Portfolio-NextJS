import { MigrationInterface, QueryRunner } from "typeorm";

export class ReorderUserColumnsWithAvatar1774600000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    // 1. DROP FK
    await queryRunner.query(`
      ALTER TABLE "oauth_accounts"
      DROP CONSTRAINT IF EXISTS "FK_22a05e92f51a983475f9281d3b0"
    `);

    // 2. CREATE TABLE ใหม่ (เรียงตาม entity)
    await queryRunner.query(`
      CREATE TABLE "user_new" (
        "id" SERIAL PRIMARY KEY,
        "firstName" varchar,
        "lastName" varchar,
        "email" varchar NOT NULL,
        "password" varchar,
        "avatar" varchar,
        "role" varchar DEFAULT 'user',
        "isEmailVerified" boolean DEFAULT false,
        "refreshTokenHash" varchar,
        "emailVerificationTokenHash" varchar,
        "emailVerificationExpires" TIMESTAMP,
        "passwordResetTokenHash" varchar,
        "passwordResetExpires" TIMESTAMP,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP
      );
    `);

    // 3. COPY DATA
    await queryRunner.query(`
      INSERT INTO "user_new" (
        id,
        "firstName",
        "lastName",
        email,
        password,
        avatar,
        role,
        "isEmailVerified",
        "refreshTokenHash",
        "emailVerificationTokenHash",
        "emailVerificationExpires",
        "passwordResetTokenHash",
        "passwordResetExpires",
        "createdAt",
        "updatedAt",
        "deletedAt"
      )
      SELECT
        id,
        "firstName",
        "lastName",
        email,
        password,
        avatar,
        role,
        "isEmailVerified",
        "refreshTokenHash",
        "emailVerificationTokenHash",
        "emailVerificationExpires",
        "passwordResetTokenHash",
        "passwordResetExpires",
        "createdAt",
        "updatedAt",
        "deletedAt"
      FROM "user";
    `);

    // 4. DROP TABLE เก่า
    await queryRunner.query(`DROP TABLE "user"`);

    // 5. RENAME
    await queryRunner.query(`ALTER TABLE "user_new" RENAME TO "user"`);

    // 6. RECREATE INDEX
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_USER_EMAIL"
      ON "user" ("email")
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "UQ_USER_EMAIL_ACTIVE"
      ON "user" ("email")
      WHERE "deletedAt" IS NULL
    `);

    // 7. RECREATE FK (⚠️ ต้องใช้ชื่อ column ที่ถูก)
    await queryRunner.query(`
      ALTER TABLE "oauth_accounts"
      ADD CONSTRAINT "fk_oauth_user"
      FOREIGN KEY ("user_id") REFERENCES "user"("id")
      ON DELETE CASCADE
    `);
  }

  public async down(): Promise<void> {
    // skip (destructive)
  }
}