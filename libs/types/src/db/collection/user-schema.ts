export interface IUserSchema {
  _id: string;
  email: string;
  password: string;
  githubToken?: string;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;
  isVerified: boolean;
  refreshToken?: string;
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
      closed_at: Date;
      merged_at: Date;
      duration: {
        hours: number;
        minutes: number;
      };
    }>;
  }>;
}
