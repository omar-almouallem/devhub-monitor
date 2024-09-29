import {
  IBasicGitHubTokenInput,
  IPullRequest,
  IRepository,
} from '@dev-hub-monitor/types';

import { MongoTodoRepository } from '../infra/repositories/userRepositories';
import { MongoRepoRepository } from '../infra/repositories/repoRepository';
import { MongoPullRequestRepository } from '../infra/repositories/pullRequstRepository';

export class GitHubTokenService {
  userRepository: MongoTodoRepository;
  githubRepository: MongoRepoRepository;
  githubPullRequest: MongoPullRequestRepository;

  constructor () {
    this.userRepository = new MongoTodoRepository();
    this.githubRepository = new MongoRepoRepository();
    this.githubPullRequest = new MongoPullRequestRepository();
  }

  async storeRepository (
    userId: string,
    repo: IRepository,
  ): Promise<IRepository> {
    const insertedData = await this.githubRepository.saveRepository(
      userId,
      repo,
    );

    return insertedData;
  }

  async storePullRequest (
    pullRequest: IPullRequest,
    repo: IRepository,
  ): Promise<IPullRequest> {
    const insertedData = await this.githubPullRequest.savePullRequest(
      pullRequest,
      repo,
    );
    return insertedData;
  }

  async getUser (id: string) {
    const user = await this.userRepository.getUserById(id);
    return user;
  }

  async storeGitHubToken (input: IBasicGitHubTokenInput) {
    const insertedToken = await this.userRepository.insertToken(
      input.userId,
      input.githubToken,
    );
    return insertedToken.githubToken;
  }

  async updateVerifyState (id: string) {
    const updateState = await this.userRepository.updateUserById(id, {
      isVerified: true,
    });
    return updateState;
  }
}
