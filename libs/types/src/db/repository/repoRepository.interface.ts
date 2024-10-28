import { IRepository } from '../../dto';

export interface IRepoRepository {
  saveRepository(userId: string, repo: IRepository): Promise<IRepository>;
  getRepoByKey(uniqueKey: string): Promise<IRepository>;
  getRepoNames(userId: string, cursor?: string);
  getUserRepos(
    userId: string,
    cursor?: string,
  ): Promise<{
    results: IRepository[];
    nextCursor: string | null;
    hasMore: boolean;
  }>;
}
