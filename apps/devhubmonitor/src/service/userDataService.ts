import { NoPullRequestsFoundError } from '@dev-hub-monitor/types';
import { MongoTodoRepository } from '../infra/repositories/userRepositories';
import { MongoRepoRepository } from '../infra/repositories/repoRepository';
import { MongoPullRequestRepository } from '../infra/repositories/pullRequstRepository';

export class UserDataService {
  userRepository: MongoTodoRepository;
  githubRepository: MongoRepoRepository;
  pullRequestRepository: MongoPullRequestRepository;

  constructor () {
    this.userRepository = new MongoTodoRepository();
    this.githubRepository = new MongoRepoRepository();
    this.pullRequestRepository = new MongoPullRequestRepository();
  }

  async getUserData (id: string) {
    const repos = await this.githubRepository.getReposByUser(id);
    const userData = await Promise.all(
      repos.map(async (repo) => {
        const pullRequests =
          await this.pullRequestRepository.getPullRequestsByRepo(
            repo.unique_key,
          );
        return {
          repo: repo,
          pullRequests: pullRequests || [],
        };
      }),
    );
    return userData;
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
    if (!result) {
      throw new NoPullRequestsFoundError();
    }

    return result;
  }

  async avregePRsByRepo (repoUniqueKeys: string[]) {
    const result = await this.pullRequestRepository.getAveragePRsByRepos(
      repoUniqueKeys,
    );
    if (!result) {
      throw new NoPullRequestsFoundError();
    }
    console.log(result);
    return result;
  }
}
