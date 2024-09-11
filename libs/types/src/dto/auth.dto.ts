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
export interface IRepoData {
  name: string;
  full_name: string;
  owner: {
    login: string;
    url: string;
  };
  created_at: Date;
  updated_at: Date;
  stars: number;
  visibility: string;
  watchers: number;
  language: string;
}
export interface IGithubData {
  gitHubRepoData?: Array<{
    name: string;
    full_name: string;
    owner: {
      login: string;
      url: string;
    };
    created_at: Date;
    updated_at: Date;
    stars: number;
    visibility: string;
    watchers: number;
    language: string;
    pull_requests: Array<{
      id: string;
      title: string;
      user: {
        login: string;
      };
      state: string;
      created_at: Date;
      updated_at: Date;
      closed_at?: Date;
      merged_at?: Date;
      duration: {
        hours: number;
        minutes: number;
      };
    }>;
  }>;
}
export interface IPullRequest {
  id: string;
  title: string;
  user: {
    login: string;
  };
  state: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  merged_at: string | null;
}
export interface IPullRequestsResponse {
  data: IPullRequest[];
}

export type IInsertUserInput = Pick<
  IUserSchema,
  'email' | 'password' | 'isVerified' | 'gitHubRepoData'
>;

export type IUpdateUserInput = Partial<IUserSchema>;
