import { IPullRequest, IRepository } from '../../dto';

export interface IPullRequestRepository {
  savePullRequest(
    pullRequest: IPullRequest,
    repo: IRepository,
  ): Promise<IPullRequest>;
  getPullByKey(uniqueKey: string): Promise<IPullRequest>;
  getPullRequestsByRepo(repoUniqueKey: string);
  projectAverages(repoUniqueKeys: string[]);
  overallProjectAverages(repoUniqueKeys: string[]);
  getAveragePRsByRepos(repoUniqueKeys: string[]);
  getAveragePRsByUser(userLogin: string);
  getAveragePRsByDate(repoUniqueKey: string, startDate: Date, endDate: Date);
}
