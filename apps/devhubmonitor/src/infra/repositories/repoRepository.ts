import { IRepository, IRepoRepository } from '@dev-hub-monitor/types';

import RepoModel from '../../models/repositories';

import { paginate } from './services/repoPaginationService';

export class MongoRepoRepository implements IRepoRepository {
  async saveRepository (
    userId: string,
    repo: IRepository,
  ): Promise<IRepository> {
    const uniqueKey = repo.full_name;
    await RepoModel.findOneAndUpdate(
      { unique_key: uniqueKey },
      {
        unique_key: uniqueKey,
        userId: userId,
        ...repo,
      },
      { new: true, upsert: true },
    );
    return this.getRepoByKey(uniqueKey);
  }

  async getRepoByKey (uniqueKey: string): Promise<IRepository> {
    const repo = await RepoModel.findOne({ unique_key: uniqueKey });
    return repo;
  }

  async getRepoNames (userId: string, cursor?: string) {
    const reposQuery = RepoModel.find(
      { userId },
      {
        unique_key: 1,
      },
    );
    const paginatedResult = await paginate(reposQuery, cursor);

    return {
      results: paginatedResult.results,
      nextCursor: paginatedResult.nextCursor,
      hasMore: paginatedResult.hasMore,
    };
  }

  async getUserRepos (
    userId: string,
    cursor?: string,
  ): Promise<{
    results: IRepository[];
    nextCursor: string | null;
    hasMore: boolean;
  }> {
    const reposQuery = RepoModel.find({ userId });
    const paginatedResult = await paginate(reposQuery, cursor);
    return {
      results: paginatedResult.results,
      nextCursor: paginatedResult.nextCursor,
      hasMore: paginatedResult.hasMore,
    };
  }
}
