import { Response } from 'express';
import {
  InvalidGitHubTokenError,
  ServerGitHubError,
} from '@dev-hub-monitor/types';

export function handleResponseError (e) {
  if (e.response) {
    if (e.response.status === 401) {
      throw new InvalidGitHubTokenError();
    } else {
      throw new ServerGitHubError();
    }
  } else {
    throw new Error('Failed to connect to GitHub server');
  }
}

export const handleError = (res: Response, error: any) => {
  console.error('Internal server error:', error);
  res.status(500).json({ message: 'Internal server error' });
};
