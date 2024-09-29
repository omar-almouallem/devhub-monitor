export interface IRepository {
  name: string;
  full_name: string;
  owner: {
    login: string;
    url: string;
  };
  userId: string;
  unique_key: string;
  created_at: Date;
  updated_at: Date;
  stars: number;
  visibility: string;
  watchers: number;
  language: string;
}
export interface IPullRequest {
  id: string;
  unique_key: string;
  repo_unique_key: string;
  number: number;
  title: string;
  user: {
    login: string;
  };
  state: string;
  created_at: Date;
  updated_at: Date;
  closed_at: Date | null;
  merged_at: Date | null;
  duration?: {
    hours: number;
    minutes: number;
  };
}
