import {
  IRepository,
  IPullRequest,
  IPullRequestRepository,
} from '@dev-hub-monitor/types';

import PullRequestModel from '../../models/pullRequest';

import { paginate } from './services/prsPaginationService';

export class MongoPullRequestRepository implements IPullRequestRepository {
  async savePullRequest (
    pullRequest: IPullRequest,
    repo: IRepository,
    userId: string,
  ): Promise<IPullRequest> {
    const uniqueKey = `${repo.unique_key}/${pullRequest.number}`;
    const repoUniqueKey = repo.unique_key;
    await PullRequestModel.findOneAndUpdate(
      { unique_key: uniqueKey },
      {
        unique_key: uniqueKey,
        userId: userId,
        repo_unique_key: repoUniqueKey,
        ...pullRequest,
      },
      { new: true, upsert: true },
    );
    return this.getPullByKey(uniqueKey);
  }

  async getPullByKey (uniqueKey: string): Promise<IPullRequest> {
    const pull = await PullRequestModel.findOne({ unique_key: uniqueKey });
    return pull;
  }

  async getPullRequestsByRepo (repoUniqueKey: string, cursor?: string) {
    const reposQuery = PullRequestModel.find({
      repo_unique_key: repoUniqueKey,
    });
    const paginatedResult = await paginate(reposQuery, cursor);

    return {
      results: paginatedResult.results,
      nextCursor: paginatedResult.nextCursor,
      hasMore: paginatedResult.hasMore,
    };
  }

  async projectAverages (repoUniqueKeys: string[]) {
    const result = await PullRequestModel.aggregate([
      {
        $match: { repo_unique_key: { $in: repoUniqueKeys } },
      },
      {
        $group: {
          _id: '$repo_unique_key',
          avgHours: { $avg: '$duration.hours' },
          avgMinutes: { $avg: '$duration.minutes' },
        },
      },
    ]);
    return result;
  }

  async overallProjectAverages (repoUniqueKeys: string[]) {
    const result = await PullRequestModel.aggregate([
      {
        $match: { repo_unique_key: { $in: repoUniqueKeys } },
      },
      {
        $group: {
          _id: null,
          avgHours: { $avg: '$duration.hours' },
          avgMinutes: { $avg: '$duration.minutes' },
        },
      },
    ]);
    return result[0];
  }

  async getAveragePRsByRepos (repoUniqueKeys: string[]) {
    const projectAverages = await this.projectAverages(repoUniqueKeys);
    const overallAverage = await this.overallProjectAverages(repoUniqueKeys);
    return {
      projectAverages,
      overallAverage,
    };
  }

  async getAveragePRsByUser (userLogin: string) {
    const result = await PullRequestModel.aggregate([
      {
        $match: { 'user.login': userLogin },
      },
      {
        $group: {
          _id: null,
          avgHours: { $avg: '$duration.hours' },
          avgMinutes: { $avg: '$duration.minutes' },
        },
      },
    ]);

    return {
      avgHours: result[0].avgHours,
      avgMinutes: result[0].avgMinutes,
    };
  }
  async getPRsuserLoginByUserId (userId: string) {
    const result = await PullRequestModel.distinct('user.login', {
      userId: userId,
    });
    return result;
  }
  async getPullRequestsByUser (userLogin: string) {
    const result = await PullRequestModel.find(
      { 'user.login': userLogin },
      {
        _id: 0,
        title: 1,
        'duration.hours': 1,
        'duration.minutes': 1,
      },
    );

    return result;
  }

  async getAveragePRsByDate (
    repoUniqueKey: string,
    startDate: Date,
    endDate: Date,
  ) {
    const result = await PullRequestModel.aggregate([
      {
        $match: {
          repo_unique_key: repoUniqueKey,
          created_at: { $gte: new Date(startDate), $lte: new Date(endDate) },
        },
      },
      {
        $group: {
          _id: null,
          avgHours: { $avg: '$duration.hours' },
          avgMinutes: { $avg: '$duration.minutes' },
        },
      },
    ]);

    return result[0];
  }
  async getPullRequestsByDate (
    repoUniqueKey: string,
    startDate: Date,
    endDate: Date,
  ) {
    const result = await PullRequestModel.aggregate([
      {
        $match: {
          repo_unique_key: repoUniqueKey,
          created_at: { $gte: new Date(startDate), $lte: new Date(endDate) },
        },
      },
    ]);

    return result;
  }
}
