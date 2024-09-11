import {
  IInsertUserInput,
  IBasicGitHubTokenInput,
  IGithubData,
} from '@dev-hub-monitor/types';

import { MongoTodoRepository } from '../infra/repositories/users-repositories';

export class GitHubTokenService {
  userRepository: MongoTodoRepository;

  constructor () {
    this.userRepository = new MongoTodoRepository();
  }

  async storeGitHubData (id: string, data: IGithubData) {
    const insertedData = await this.userRepository.insertGitHubData(id, data);
    console.log(this.getUser(id));
    console.log(data);

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
