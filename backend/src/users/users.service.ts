import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
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

  // =====================================================================================
  // ทำให้ email เป็นรูปแบบมาตรฐาน (lowercase และ trim) เพื่อป้องกันปัญหาการค้นหาและการเปรียบเทียบ
  // =====================================================================================
  private normalizeEmail(email: string) {
    return email.toLowerCase().trim(); // ทำให้ email เป็น lowercase และ trim
  }

  // ===========================================================================
  // FIND USER BY EMAIL (สำหรับการตรวจสอบข้อมูลจากการลงทะเบียนหรือการแสดงข้อมูลผู้ใช้)
  // ===========================================================================
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  // =====================================================================
  // FIND USER WITH PASSWORD (สำหรับการตรวจสอบข้อมูลเข้าสู่ระบบ)
  // =====================================================================
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

  // =====================================================================
  // FIND USER BY ID (สำหรับการตรวจสอบข้อมูลจาก token หรือการแสดงข้อมูลผู้ใช้)
  // =====================================================================
  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
      select: ['id', 'email', 'role', 'isEmailVerified', 'avatar', 'deletedAt'],
    });
  }

  // =====================================================================================
  // FIND USER BY ID WITH REFRESH TOKEN (สำหรับการตรวจสอบข้อมูลจาก token หรือการแสดงข้อมูลผู้ใช้)
  // =====================================================================================
  async findByIdWithRefreshToken(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
      select: ['id', 'email', 'role', 'isEmailVerified', 'refreshTokenHash'],
    });
  }

  // ================================================================================================
  // FIND USER BY ID WITH EMAIL VERIFICATION TOKEN (สำหรับการตรวจสอบข้อมูลจาก token หรือการแสดงข้อมูลผู้ใช้)
  // ================================================================================================
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

  // ================================================================================================
  // FIND USER BY ID WITH PASSWORD RESET TOKEN (สำหรับการตรวจสอบข้อมูลจาก token หรือการแสดงข้อมูลผู้ใช้)
  // ================================================================================================
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

  // ===========================================================================================================
  // UPDATE REFRESH TOKEN (สำหรับการบันทึก hash ของ refresh token ในฐานข้อมูลเพื่อใช้ในการตรวจสอบเมื่อมีการ refresh token)
  // ===========================================================================================================
  async updateRefreshToken(userId: number, tokenHash: string | null) {
    return this.usersRepository.update(
      { id: userId, deletedAt: null },
      {
        refreshTokenHash: tokenHash,
      },
    );
  }

  // =============================================================================================================================
  // UPDATE EMAIL VERIFICATION TOKEN (สำหรับการบันทึก hash ของ email verification token ในฐานข้อมูลเพื่อใช้ในการตรวจสอบเมื่อมีการยืนยันอีเมล)
  // =============================================================================================================================
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

  // ==================================================================================
  // MARK EMAIL AS VERIFIED (สำหรับการอัปเดตสถานะการยืนยันอีเมลของผู้ใช้เมื่อมีการยืนยันอีเมลสำเร็จ)
  // ==================================================================================
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

  // ======================================================================================================================
  // UPDATE PASSWORD RESET TOKEN (สำหรับการบันทึก hash ของ password reset token ในฐานข้อมูลเพื่อใช้ในการตรวจสอบเมื่อมีการรีเซ็ตรหัสผ่าน)
  // ======================================================================================================================
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

  // ==================================================================
  // RESET PASSWORD (สำหรับการอัปเดตรหัสผ่านของผู้ใช้เมื่อมีการรีเซ็ตรหัสผ่านสำเร็จ)
  // ==================================================================
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

  // =====================================================================================
  // CREATE USER (สำหรับการสร้างผู้ใช้ใหม่จากการลงทะเบียนหรือการเข้าสู่ระบบด้วย OAuth)
  // =====================================================================================
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
      this.logger.error(
        `Error creating user with email ${userData.email}: ${error.message}`,
      );
      throw new UnauthorizedException('Email already in use');
    }
  }

  async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  // =====================================================================================
  // FIND USER BY OAUTH (สำหรับการตรวจสอบข้อมูลจากการเข้าสู่ระบบด้วย OAuth)
  // =====================================================================================
  async findByOAuth(
    provider: string,
    providerId: string,
  ): Promise<OauthAccount | null> {
    return this.oauthRepository.findOne({
      where: { provider, providerId },
      relations: ['user'],
    });
  }

  // =================================================================================================
  // CREATE OAUTH ACCOUNT (สำหรับการสร้างบัญชี OAuth ใหม่เมื่อมีการเข้าสู่ระบบด้วย OAuth และยังไม่มีบัญชีที่เชื่อมโยงอยู่)
  // =================================================================================================
  async createOAuthAccount(
    user: User,
    provider: string,
    providerId: string,
  ): Promise<OauthAccount> {
    const oauth = this.oauthRepository.create({
      provider,
      providerId,
      user,
    });

    try {
      return await this.oauthRepository.save(oauth);
    } catch (error) {
      this.logger.error(
        `Error creating OAuth account (${provider}:${providerId}): ${error.message}`,
      );
      throw new UnauthorizedException('Failed to create OAuth account');
    }
  }

  // ================================================================================================================================
  // SOFT DELETE USER (สำหรับการลบผู้ใช้แบบ soft delete โดยการตั้งค่า deletedAt และล้างข้อมูลที่เกี่ยวข้องกับ token เพื่อป้องกันการใช้งานต่อหลังจากถูกลบ)
  // ================================================================================================================================
  async softDelete(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId, deletedAt: null },
    });

    if (!user) {
      throw new UnauthorizedException('User not found or already deleted');
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
