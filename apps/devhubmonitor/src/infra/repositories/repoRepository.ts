import { IRepository, IRepoRepository } from '@dev-hub-monitor/types';

import RepoModel from '../../models/repositories';

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

  async getReposByUser (userId: string): Promise<IRepository[]> {
    const repos = await RepoModel.find({ userId: userId });
    return repos;
  }
}
