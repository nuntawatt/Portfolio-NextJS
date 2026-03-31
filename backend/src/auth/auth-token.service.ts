import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { AuthToken, AuthTokenType } from '../users/entities/auth_tokens.entity';
import { User } from '../users/entities/users.entity';

@Injectable()
export class AuthTokenService {
    private readonly logger = new Logger(AuthTokenService.name);

    constructor(
        @InjectRepository(AuthToken)
        private authTokenRepository: Repository<AuthToken>,
    ) { }

    // ─── Create ───────────────────────────────────────────────────────────────────

    async createToken(
        user: User,
        type: AuthTokenType,
        tokenHash: string,
        expiresAt: Date,
    ): Promise<AuthToken> {
        // revoke token เก่าของ type เดิมก่อนสร้างใหม่
        await this.revokeUserTokens(user.id, type);

        const token = this.authTokenRepository.create({
            user,
            type,
            tokenHash,
            expiresAt,
        });

        return this.authTokenRepository.save(token);
    }

    // ─── Finders ─────────────────────────────────────────────────────────────────

    async findValidToken(tokenHash: string, type: AuthTokenType): Promise<AuthToken | null> {
        return this.authTokenRepository.findOne({
            where: {
                tokenHash,
                type,
                usedAt: null,
                expiresAt: MoreThan(new Date()),
            },
            relations: ['user'],
        });
    }

    async findValidRefreshToken(userId: number, tokenHash: string): Promise<AuthToken | null> {
        return this.authTokenRepository.findOne({
            where: {
                tokenHash,
                type: AuthTokenType.REFRESH_TOKEN,
                usedAt: null,
                expiresAt: MoreThan(new Date()),
                user: { id: userId },
            },
            relations: ['user'],
        });
    }

    // ─── Mutations ────────────────────────────────────────────────────────────────

    // Atomic find + mark used ในครั้งเดียว เพื่อป้องกัน race condition
    async consumeToken(tokenHash: string, type: AuthTokenType): Promise<AuthToken | null> {
        const now = new Date();

        const result = await this.authTokenRepository
            .createQueryBuilder('t') // ใช้ query builder เพื่อทำ atomic update
            .update(AuthToken)
            .set({ usedAt: now })
            .where(
                't.tokenHash = :tokenHash AND t.type = :type AND t.usedAt IS NULL AND t.expiresAt > :now',
                { tokenHash, type, now },
            )
            .returning('*') // PostgreSQL เท่านั้น
            .execute();

        if (!result.affected || result.affected === 0) return null;

        // โหลด relations เพิ่ม
        const tokenId = result.raw[0]?.id;
        if (!tokenId) return null;

        return this.authTokenRepository.findOne({
            where: { id: tokenId },
            relations: ['user'],
        });
    }

    async markTokenUsed(tokenId: number): Promise<void> {
        await this.authTokenRepository.update(tokenId, { usedAt: new Date() });
    }

    async revokeUserTokens(userId: number, type: AuthTokenType): Promise<void> {
        await this.authTokenRepository.update(
            { user: { id: userId }, type, usedAt: null },
            { usedAt: new Date() },
        );
    }

    async revokeAllUserTokens(userId: number): Promise<void> {
        await this.authTokenRepository.update(
            { user: { id: userId }, usedAt: null },
            { usedAt: new Date() },
        );
    }
}
