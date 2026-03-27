import { MigrationInterface, QueryRunner } from "typeorm";

export class ReorderUserColumns1774599999999 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {

        // =========================
        // 1. DROP FK (สำคัญมาก)
        // =========================
        await queryRunner.query(`
        ALTER TABLE "oauth_accounts"
        DROP CONSTRAINT IF EXISTS "FK_22a05e92f51a983475f9281d3b0"
        `);

        // =========================
        // 2. CREATE NEW TABLE (เรียง column ใหม่)
        // =========================
        await queryRunner.query(`
        CREATE TABLE "user_new" (
        "id" SERIAL PRIMARY KEY,
        "firstName" varchar,
        "lastName" varchar,
        "email" varchar NOT NULL,
        "password" varchar,
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

        // =========================
        // 3. COPY DATA (ครบทุก column)
        // =========================
        await queryRunner.query(`
        INSERT INTO "user_new" (
        id,
        "firstName",
        "lastName",
        email,
        password,
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

        // =========================
        // 4. DROP OLD TABLE
        // =========================
        await queryRunner.query(`
        DROP TABLE "user"
        `);

        // =========================
        // 5. RENAME NEW → user
        // =========================
        await queryRunner.query(`
        ALTER TABLE "user_new" RENAME TO "user"
        `);

        // =========================
        // 6. RECREATE INDEX (สำคัญ)
        // =========================
        await queryRunner.query(`
        CREATE INDEX IF NOT EXISTS "IDX_USER_EMAIL"
        ON "user" ("email")
        `);

        await queryRunner.query(`
        CREATE UNIQUE INDEX IF NOT EXISTS "UQ_USER_EMAIL_ACTIVE"
        ON "user" ("email")
        WHERE "deletedAt" IS NULL
        `);

        // =========================
        // 7. RECREATE FK
        // =========================
        await queryRunner.query(`
        ALTER TABLE "oauth_accounts"
        ADD CONSTRAINT "FK_22a05e92f51a983475f9281d3b0"
        FOREIGN KEY ("user_id") REFERENCES "user"("id")
        ON DELETE CASCADE
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // rollback ไม่ได้ เพราะข้อมูลอาจเสียหายได้ง่ายมากจากการเรียง column ใหม่
    }
}