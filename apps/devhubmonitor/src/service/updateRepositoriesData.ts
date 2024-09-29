import {
  InvalidGitHubTokenError,
  ServerGitHubTokenError,
} from '@dev-hub-monitor/types';

import { handleError } from '../lib/utils';
import { getTowDaysAgo } from '../lib/utils/timeHelpers';
import { CONCURRENCY_DURATION } from '../config/constants';
import { GitHubTokenService } from '../service/gitHubTokenService';
import { runPromisePool } from '../lib/concurrentProcessor/promisePool';
import { MongoTodoRepository } from '../infra/repositories/userRepositories';
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
              await this.gitHubConnectionService.fetchData(
                user._id,
                user.githubToken,
                getTowDaysAgo(),
              );
            }
          } catch (e) {
            if (e instanceof InvalidGitHubTokenError) {
              await this.userRepository.updateUserById(user._id, {
                isVerified: false,
              });
            } else {
              console.log(e);
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
