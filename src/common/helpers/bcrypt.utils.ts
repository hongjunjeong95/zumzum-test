import bcrypt from 'bcryptjs';
import { envRequired } from './env-required';

export class BCryptUtils {
  static async encrypt(password: string): Promise<string> {
    const saltRounds = envRequired(process.env.BCRYPT_SALT_ROUNDS, 10);
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hashSync(password, salt);
  }

  static async verify(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
