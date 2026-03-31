import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
    Index,
} from 'typeorm';
import { User } from './users.entity'

export enum AuthTokenType {
    EMAIL_VERIFY = 'EMAIL_VERIFY',
    PASSWORD_RESET = 'PASSWORD_RESET',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
}

@Entity('auth_tokens')
@Index(['tokenHash', 'type']) // เพิ่ม index เพราะ query บ่อย
export class AuthToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tokenHash: string;

    @Column({ type: 'enum', enum: AuthTokenType })
    type: AuthTokenType;

    @Column({ type: 'timestamptz' })
    expiresAt: Date;

    @Column({ type: 'timestamptz', nullable: true })
    usedAt: Date | null;

    @ManyToOne(() => User, (user) => user.authTokens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
}
