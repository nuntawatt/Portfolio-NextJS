import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { OauthAccount } from './entities/oauth_accounts.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(OauthAccount)
    private oauthRepository: Repository<OauthAccount>,
  ) { }

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  // ทำให้ email เป็นรูปแบบมาตรฐาน (lowercase และ trim) เพื่อป้องกันปัญหาการค้นหาและการเปรียบเทียบ
  private normalizeEmail(email: string) {
    return email.toLowerCase().trim();
  }

  // ─── Finders ─────────────────────────────────────────────────────────────────

  async findByEmail(email: string): Promise<User | null> {
    // ใช้ normalize + กัน soft-deleted user (เดิมไม่ทำทั้งคู่)
    return this.usersRepository.findOne({
      where: {
        email: this.normalizeEmail(email),
        deletedAt: null,
      },
    });
  }

  // FIND USER WITH PASSWORD (สำหรับการตรวจสอบข้อมูลเข้าสู่ระบบ)
  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        email: this.normalizeEmail(email),
        deletedAt: null,
      },
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'password',
        'role',
        'isEmailVerified',
        'avatar',
        'deletedAt',
      ],
    });
  }

  // FIND USER BY ID (สำหรับการตรวจสอบข้อมูลจาก token หรือการแสดงข้อมูลผู้ใช้)
  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
      select: ['id', 'email', 'role', 'isEmailVerified', 'avatar', 'deletedAt'],
    });
  }

  // FIND USER BY ID WITH REFRESH TOKEN (สำหรับการตรวจสอบข้อมูลจาก token หรือการแสดงข้อมูลผู้ใช้)
  async findByIdWithRefreshToken(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
      select: ['id', 'email', 'role', 'isEmailVerified', 'refreshTokenHash'],
    });
  }

  // FIND USER BY ID WITH EMAIL VERIFICATION TOKEN (สำหรับการตรวจสอบข้อมูลจาก token หรือการแสดงข้อมูลผู้ใช้)
  async findByEmailVerificationTokenHash(
    tokenHash: string,
  ): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        emailVerificationTokenHash: tokenHash,
        deletedAt: null,
      },
      select: [
        'id',
        'email',
        'isEmailVerified',
        'emailVerificationTokenHash',
        'emailVerificationExpires',
        'deletedAt',
      ],
    });
  }

  // FIND USER BY ID WITH PASSWORD RESET TOKEN (สำหรับการตรวจสอบข้อมูลจาก token หรือการแสดงข้อมูลผู้ใช้))
  async findByPasswordResetTokenHash(tokenHash: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        passwordResetTokenHash: tokenHash,
        deletedAt: null,
      },
      select: [
        'id',
        'email',
        'passwordResetTokenHash',
        'passwordResetExpires',
        'deletedAt',
      ],
    });
  }

  // ─── Mutations ────────────────────────────────────────────────────────────────
  async create(userData: {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string | null;
    avatar?: string | null;
  }): Promise<User> {
    const user = this.usersRepository.create({
      firstName: userData.firstName ?? null,
      lastName: userData.lastName ?? null,
      email: userData.email,
      password: userData.password,
      avatar: userData.avatar ?? null,
    });

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      // FIX: ConflictException แทน UnauthorizedException
      if (error.code === '23505') {      // PostgreSQL unique violation
        throw new ConflictException('Email already in use');
      }
      this.logger.error(`Error creating user: ${error.message}`);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async updateRefreshToken(userId: number, tokenHash: string | null) {
    return this.usersRepository.update(
      { id: userId, deletedAt: null },
      { refreshTokenHash: tokenHash },
    );
  }

  // UPDATE EMAIL VERIFICATION TOKEN (สำหรับการบันทึก hash ของ email verification token ในฐานข้อมูลเพื่อใช้ในการตรวจสอบเมื่อมีการยืนยันอีเมล)
  async updateEmailVerificationToken(
    userId: number,
    tokenHash: string | null,
    expiresAt: Date | null,
  ) {
    return this.usersRepository.update(
      { id: userId, deletedAt: null },
      {
        emailVerificationTokenHash: tokenHash,
        emailVerificationExpires: expiresAt,
      },
    );
  }

  // MARK EMAIL AS VERIFIED (สำหรับการอัปเดตสถานะการยืนยันอีเมลของผู้ใช้เมื่อมีการยืนยันอีเมลสำเร็จ)
  async markEmailVerified(userId: number) {
    return this.usersRepository.update(
      { id: userId, deletedAt: null },
      {
        isEmailVerified: true,
        emailVerificationTokenHash: null,
        emailVerificationExpires: null,
      },
    );
  }
  // UPDATE PASSWORD RESET TOKEN (สำหรับการบันทึก hash ของ password reset token ในฐานข้อมูลเพื่อใช้ในการตรวจสอบเมื่อมีการรีเซ็ตรหัสผ่าน)
  async updatePasswordResetToken(
    userId: number,
    tokenHash: string | null,
    expiresAt: Date | null,
  ) {
    return this.usersRepository.update(
      { id: userId, deletedAt: null },
      {
        passwordResetTokenHash: tokenHash,
        passwordResetExpires: expiresAt,
      },
    );
  }

  // RESET PASSWORD (สำหรับการอัปเดตรหัสผ่านของผู้ใช้เมื่อมีการรีเซ็ตรหัสผ่านสำเร็จ)
  async resetPassword(userId: number, hashedPassword: string) {
    return this.usersRepository.update(
      { id: userId, deletedAt: null },
      {
        password: hashedPassword,
        passwordResetTokenHash: null,
        passwordResetExpires: null,
      },
    );
  }

  // ─── OAuth ───────────────────────────────────────────────────────────────────
  async findByOAuth(provider: string, providerId: string): Promise<OauthAccount | null> {
    return this.oauthRepository.findOne({
      where: { provider, providerId },
      relations: ['user'],
    });
  }

  async createOAuthAccount(user: User, provider: string, providerId: string): Promise<OauthAccount> {
    const oauth = this.oauthRepository.create({ provider, providerId, user });

    try {
      return await this.oauthRepository.save(oauth);
    } catch (error) {
      this.logger.error(`Error creating OAuth account (${provider}:${providerId}): ${error.message}`);
      throw new InternalServerErrorException('Failed to create OAuth account');
    }
  }

  // ─── Soft Delete ──────────────────────────────────────────────────────────────
  async softDelete(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId, deletedAt: null },
    });

    if (!user) {
      throw new NotFoundException('User not found or already deleted');
    }

    return this.usersRepository.update(
      { id: userId, deletedAt: null },
      {
        deletedAt: new Date(),
        refreshTokenHash: null,
        emailVerificationTokenHash: null,
        emailVerificationExpires: null,
        passwordResetTokenHash: null,
        passwordResetExpires: null,
      },
    );
  }
}
