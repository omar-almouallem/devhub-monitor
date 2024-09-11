import {
  InvalidGitHubTokenError,
  ServerGitHubTokenError,
} from '@dev-hub-monitor/types';

import { handleError } from '../lib/utils';
import { CONCURRENCY_DURATION } from '../config/constants';
import { GitHubTokenService } from '../service/gitHubTokenService';
import { runPromisePool } from '../lib/concurrentProcessor/promisePool';
import { MongoTodoRepository } from '../infra/repositories/users-repositories';
import { GitHubConnectionService } from '../lib/github/githubConnectionService';

export class UpdateDataService {
  userRepository: MongoTodoRepository;
  githubTokenService: GitHubTokenService;
  gitHubConnectionService: GitHubConnectionService;

  constructor () {
    this.userRepository = new MongoTodoRepository();
    this.githubTokenService = new GitHubTokenService();
    this.gitHubConnectionService = new GitHubConnectionService();
  }

  updateRepositoriesData = async () => {
    try {
      const allUsers = await this.userRepository.getAllUser();
      const { results, errors } = await runPromisePool(
        allUsers,
        CONCURRENCY_DURATION,
        async (user) => {
          try {
            if (user && user.githubToken !== undefined) {
              const newUserData = await this.gitHubConnectionService.fetchData(
                user.githubToken,
              );
              await this.githubTokenService.storeGitHubData(
                user._id,
                newUserData,
              );
            }
          } catch (e) {
            if (e instanceof InvalidGitHubTokenError) {
              await this.userRepository.updateUserById(user.id, {
                isVerified: false,
              });
              console.log(
                `Invalid Token for user ${user.id}, You Should insert new Token!`,
              );
            } else {
              throw new ServerGitHubTokenError();
            }
          }
        },
      );

      console.log('Completed processing users:', results.length);
    } catch (e) {
      handleError(e.response, e);
    }
  };
}
