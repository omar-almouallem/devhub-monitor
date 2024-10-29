import {
  NoPullRequestsFoundError,
  NoUserWithPRsFoundError,
} from '@dev-hub-monitor/types';

import { MongoPullRequestRepository } from '../infra/repositories/pullRequstRepository';

export class PullRequestService {
  pullRequestRepository: MongoPullRequestRepository;

  constructor () {
    this.pullRequestRepository = new MongoPullRequestRepository();
  }
  async avregePRsByUser (userName: string) {
    const result = await this.pullRequestRepository.getAveragePRsByUser(
      userName,
    );
    if (!result) {
      throw new NoPullRequestsFoundError();
    }

    return result;
  }
  async avregePRsByDate (repoUniqueKey: string, startTime: Date, endTime: Date) {
    const result = await this.pullRequestRepository.getAveragePRsByDate(
      repoUniqueKey,
      startTime,
      endTime,
    );
    if (!result || result.length === 0) {
      throw new NoPullRequestsFoundError();
    }

    return result;
  }
  async avregePRsByRepos (repoUniqueKeys: string[]) {
    const result = await this.pullRequestRepository.getAveragePRsByRepos(
      repoUniqueKeys,
    );
    if (
      !result ||
      result.projectAverages.length === 0 ||
      result.overallAverage === undefined
    ) {
      throw new NoPullRequestsFoundError();
    }
    return result;
  }
  async getPullRequestsByDate (
    repoUniqueKey: string,
    startTime: Date,
    endTime: Date,
  ) {
    const result = await this.pullRequestRepository.getPullRequestsByDate(
      repoUniqueKey,
      startTime,
      endTime,
    );
    if (!result) {
      throw new NoPullRequestsFoundError();
    }

    return result;
  }
  async getPullRequestsByUser (userName: string) {
    const result = await this.pullRequestRepository.getPullRequestsByUser(
      userName,
    );
    if (!result) {
      throw new NoPullRequestsFoundError();
    }

    return result;
  }
  async getPullRequestsByRepo (repoKey: string, cursor?: string) {
    const pullRequests = await this.pullRequestRepository.getPullRequestsByRepo(
      repoKey,
      cursor,
    );
    return {
      results: pullRequests.results || [],
      nextCursor: pullRequests.nextCursor,
      hasMore: pullRequests.hasMore,
    };
  }
  async getPRsuserLoginByUserId (id: string) {
    const repos = await this.pullRequestRepository.getPRsuserLoginByUserId(id);
    if (!repos || repos.length === 0) throw new NoUserWithPRsFoundError();
    return repos;
  }
}
