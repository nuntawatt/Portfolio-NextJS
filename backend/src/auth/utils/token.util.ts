import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';

export const generateRandomToken = (): string =>
    crypto.randomBytes(32).toString('hex');

export const sha256 = (value: string): string =>
    crypto.createHash('sha256').update(value).digest('hex');

// ใช้ bcrypt สำหรับ refresh token hash (brute-force resistant)
export const hashToken = (token: string): Promise<string> =>
    bcrypt.hash(token, 10);

export const compareToken = (token: string, hash: string): Promise<boolean> =>
    bcrypt.compare(token, hash);