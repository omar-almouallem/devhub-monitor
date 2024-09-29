import { IUserSchema } from '../db';

export interface IBasicSignupInput {
  email: string;
  password: string;
}
export interface IBasicLoginInput {
  email: string;
  password: string;
}
export interface IBasicGitHubTokenInput {
  githubToken: string;
  userId: string;
}

export type IInsertUserInput = Pick<
  IUserSchema,
  'email' | 'password' | 'isVerified'
>;

export type IUpdateUserInput = Partial<IUserSchema>;
