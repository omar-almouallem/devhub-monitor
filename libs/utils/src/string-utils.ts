import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const HASH_SALT_ROUNDS = 12;
export function hash (input: string): Promise<string> {
  return bcrypt.hash(input, HASH_SALT_ROUNDS);
}

export function compareWithHash (
  rawPassword: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(rawPassword, hash);
}

export function createJwtToken (
  payload: any,
  secret: string,
  expiresIn: number,
): string {
  return jwt.sign(payload, secret, {
    expiresIn: expiresIn,
  });
}

export function decodeToken (token: string) {
  const user = jwt.decode(token);
  return user.id;
}
