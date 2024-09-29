export interface IUserSchema {
  _id: string;
  email: string;
  password: string;
  githubToken?: string;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;
  isVerified: boolean;
  refreshToken?: string;
}
