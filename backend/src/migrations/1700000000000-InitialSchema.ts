import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "user" (
        "id"                          uuid              NOT NULL DEFAULT gen_random_uuid(),
        "firstName"                   varchar           NULL,
        "lastName"                    varchar           NULL,
        "email"                       varchar           NOT NULL,
        "password"                    varchar           NULL,
        "avatar"                      varchar           NULL,
        "role"                        varchar           NOT NULL DEFAULT 'user',
        "isEmailVerified"             boolean           NOT NULL DEFAULT false,
        "refreshTokenHash"            varchar           NULL,
        "emailVerificationTokenHash"  varchar           NULL,
        "emailVerificationExpires"    TIMESTAMP         NULL,
        "passwordResetTokenHash"      varchar           NULL,
        "passwordResetExpires"        TIMESTAMP         NULL,
        "createdAt"                   TIMESTAMP         NOT NULL DEFAULT now(),
        "updatedAt"                   TIMESTAMP         NOT NULL DEFAULT now(),
        "deletedAt"                   TIMESTAMP         NULL,
        CONSTRAINT "UQ_user_email"    UNIQUE ("email"),
        CONSTRAINT "PK_user"         PRIMARY KEY ("id")
        )
    `);

        await queryRunner.query(`
        CREATE TABLE "oauth_accounts" (
        "id"          uuid      NOT NULL DEFAULT gen_random_uuid(),
        "provider"    varchar   NOT NULL,
        "providerId"  varchar   NOT NULL,
        "createdAt"   TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt"   TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt"   TIMESTAMP NULL,
        "user_id"     uuid      NULL,
        CONSTRAINT "UQ_oauth_provider" UNIQUE ("provider", "providerId"),
        CONSTRAINT "PK_oauth"          PRIMARY KEY ("id"),
        CONSTRAINT "FK_oauth_user"     FOREIGN KEY ("user_id")
        REFERENCES "user"("id") ON DELETE CASCADE
        )
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "oauth_accounts"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}