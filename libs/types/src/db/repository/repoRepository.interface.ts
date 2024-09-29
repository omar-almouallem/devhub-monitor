import { IRepository } from '../../dto';

export interface IRepoRepository {
  saveRepository(userId: string, repo: IRepository): Promise<IRepository>;
  getRepoByKey(uniqueKey: string): Promise<IRepository>;
  getReposByUser(userId: string): Promise<IRepository[]>;
}
