import axios from 'axios';
import { IGithubData } from '@dev-hub-monitor/types';

import { BASE_GITHUB_URL } from '../../config/constants';

import {
  formatPullRequestsData,
  mergeReposWithPulls,
  handleResponseError,
} from '../utils';
import { formatUserData } from '../utils/formatUserData';

const axiosInstance = axios.create({
  baseURL: BASE_GITHUB_URL,
});

export class GitHubConnectionService {
  async getUser (githubToken: string) {
    try {
      const user = await axiosInstance.get('/user', {
        headers: {
          Authorization: `token ${githubToken}`,
        },
      });
      const formatettedData = formatUserData(user);
      return formatettedData;
    } catch (e) {
      handleResponseError(e);
    }
  }
  async getRepositories (githubToken: string) {
    try {
      const repositoriesResponse = await axiosInstance.get('/user/repos', {
        headers: {
          Authorization: `token ${githubToken}`,
        },
      });
      return repositoriesResponse.data;
    } catch (e) {
      handleResponseError(e);
    }
  }
  async getPullRequests (repoFullName: string, githubToken: string) {
    try {
      const pullRequestsResponse = await axiosInstance.get(
        `/repos/${repoFullName}/pulls`,
        {
          headers: { Authorization: `token ${githubToken}` },
          params: { state: 'all' },
        },
      );
      const pullRequests = formatPullRequestsData(pullRequestsResponse);
      return pullRequests;
    } catch (e) {
      handleResponseError(e);
    }
  }

  async fetchData (githubToken: string): Promise<IGithubData | any> {
    const repositories = await this.getRepositories(githubToken);
    const repositoriesWithPullRequests = await mergeReposWithPulls(
      repositories,
      this.getPullRequests,
      githubToken,
    );

    return repositoriesWithPullRequests;
  }
}
