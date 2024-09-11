import { ReactNode } from 'react';

export interface PullRequest {
  duration: any;
  user: any;
  id: number;
  title: string;
  state: string;
  language?: string;
  created_at: string;
}

export interface Repository {
  created_at: string | number | Date;
  stars: ReactNode;
  language: string;
  id: number;
  name: string;
  stargazers_count: number;
  updated_at: string;
  pull_requests: PullRequest[];
}
