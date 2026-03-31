import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Unique,
    CreateDateColumn,
    JoinColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity('oauth_accounts')
@Unique(['provider', 'providerId'])
export class OauthAccount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    provider: string;

    @Column()
    providerId: string;

    @ManyToOne(() => User, (user) => user.oauthAccounts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt: Date | null;
}
