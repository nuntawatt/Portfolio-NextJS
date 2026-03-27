import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';

export const generateRandomToken = () => crypto.randomBytes(32).toString('hex');

export const sha256 = (value: string) =>
  crypto.createHash('sha256').update(value).digest('hex');

export const hashToken = async (token: string) => {
  return bcrypt.hash(token, 10);
};

export const compareToken = async (token: string, hash: string) => {
  return bcrypt.compare(token, hash);
};
