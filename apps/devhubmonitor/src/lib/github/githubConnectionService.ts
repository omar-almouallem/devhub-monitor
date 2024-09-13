import axios from 'axios';
import axiosRetry from 'axios-retry';
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
axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
  retryCondition: (error) => {
    return error.response.status === 429 || error.response.status >= 500;
  },
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
    let allRepositories = [];
    let page = 1;
    let perPage = 30;
    let hasMore = true;
    try {
      while (hasMore) {
        const repositoriesResponse = await axiosInstance.get('/user/repos', {
          headers: {
            Authorization: `token ${githubToken}`,
          },
          params: {
            page,
            per_page: perPage,
          },
        });

        const repositories = repositoriesResponse.data;
        console.log(`repositories:${repositories}`);

        allRepositories = [...allRepositories, ...repositories];
        if (repositories.length < perPage) {
          hasMore = false;
        } else {
          page++;
        }
      }
      console.log(allRepositories);
      return allRepositories;
    } catch (e) {
      handleResponseError(e);
    }
  }
  async getPullRequests (repoFullName: string, githubToken: string) {
    let allPullRequests = [];
    let page = 1;
    let perPage = 30;
    let hasMore = true;

    try {
      while (hasMore) {
        const pullRequestsResponse = await axiosInstance.get(
          `/repos/${repoFullName}/pulls`,
          {
            headers: { Authorization: `token ${githubToken}` },
            params: {
              state: 'all',
              page,
              per_page: perPage,
            },
          },
        );

        const pullRequests = formatPullRequestsData(pullRequestsResponse);

        allPullRequests = [...allPullRequests, ...pullRequests];

        if (pullRequests.length < perPage) {
          hasMore = false;
        } else {
          page++;
        }
      }

      return allPullRequests;
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
