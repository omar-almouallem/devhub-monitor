import axios from 'axios';
import axiosRetry from 'axios-retry';
import { IRepository, IPullRequest } from '@dev-hub-monitor/types';

import { BASE_GITHUB_URL } from '../../config/constants';
import { GitHubTokenService } from '../../service/gitHubTokenService';

import {
  formatPullRequestsData,
  handleResponseError,
  formatRepoData,
} from '../utils';

const axiosInstance = axios.create({
  baseURL: BASE_GITHUB_URL,
});
axiosRetry(axiosInstance, {
  retries: 8,
  retryDelay: (retryCount) => {
    return retryCount * 10000;
  },
  retryCondition: (error) => {
    return error.response.status === 429 || error.response.status >= 500;
  },
});
interface PaginationParams {
  page?: number;
  per_page?: number;
  since?: string;
  state: string;
  sort: string;
  direction: string;
}

export class GitHubConnectionService {
  githubTokenService: GitHubTokenService;
  constructor () {
    this.githubTokenService = new GitHubTokenService();
  }

  async getUser (githubToken: string) {
    try {
      const user = await axiosInstance.get('/user', {
        headers: {
          Authorization: `token ${githubToken}`,
        },
      });
      return user.data;
    } catch (e) {
      handleResponseError(e);
    }
  }

  async *fetchPaginatedData (
    url: string,
    githubToken: string,
    params: PaginationParams,
    formatDataFn: (response: any) => Promise<any>,
    stopConditionFn?: (item: any) => boolean,
  ) {
    let page = 1;
    let perPage = params.per_page || 1;
    let hasMore = true;

    try {
      while (hasMore) {
        params.page = page;
        params.per_page = perPage;

        const response = await axiosInstance.get(url, {
          headers: { Authorization: `token ${githubToken}` },
          params,
        });

        const data = await formatDataFn(response);

        for (const item of data) {
          if (stopConditionFn && stopConditionFn(item)) {
            hasMore = false;
            break;
          }
          yield item;
        }

        const linkHeader = response.headers['link'];
        if (linkHeader) {
          const hasNextPage = linkHeader.includes('rel="next"');
          hasMore = hasNextPage;
        } else {
          hasMore = false;
        }

        page++;
      }
    } catch (e) {
      handleResponseError(e);
    }
  }

  async getRepositories (userId: string, githubToken: string, since: Date) {
    const params = {
      state: 'all',
      sort: 'updated',
      direction: 'desc',
      since: since.toISOString(),
    };

    for await (const repo of this.fetchPaginatedData(
      '/user/repos',
      githubToken,
      params,
      formatRepoData,
    )) {
      const updatedRepo = await this.githubTokenService.storeRepository(
        userId,
        repo,
      );

      await this.getPullRequestsV2(
        repo.full_name,
        githubToken,
        since,
        updatedRepo,
      );
    }
  }

  async getPullRequestsV2 (
    repoFullName: string,
    githubToken: string,
    since: Date,
    updatedRepo: IRepository,
  ) {
    const params = {
      state: 'all',
      sort: 'updated',
      direction: 'desc',
    };

    for await (const pr of this.fetchPaginatedData(
      `/repos/${repoFullName}/pulls`,
      githubToken,
      params,
      formatPullRequestsData,
      (pr) => new Date(pr.updated_at) < since,
    )) {
      await this.githubTokenService.storePullRequest(pr, updatedRepo);
    }
  }

  async fetchData (userId: string, githubToken: string, since: Date) {
    await this.getRepositories(userId, githubToken, since);
  }
}
