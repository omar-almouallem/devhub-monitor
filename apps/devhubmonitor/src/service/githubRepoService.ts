import {
  InvalidGitHubTokenError,
  NoPullRequestsFoundError,
  NoRepositoriesFoundError,
} from '@dev-hub-monitor/types';
import { MongoRepoRepository } from '../infra/repositories/repoRepository';

export class GithubRepoService {
  githubRepository: MongoRepoRepository;

  constructor () {
    this.githubRepository = new MongoRepoRepository();
  }

  async getUserReposById (id: string, cursor?: string) {
    const repos = await this.githubRepository.getUserRepos(id, cursor);
    return {
      results: repos.results,
      nextCursor: repos.nextCursor,
      hasMore: repos.hasMore,
    };
  }

  async getRepoByUser (id: string) {
    const repos = await this.githubRepository.getUserRepos(id);
    if (!repos) throw new NoPullRequestsFoundError();

    return repos;
  }

  async getRepoNamesById (id: string, cursor?: string) {
    const repos = await this.githubRepository.getRepoNames(id, cursor);
    if (!repos.results || repos.results.length === 0) {
      throw new NoRepositoriesFoundError();
    }

    return repos;
  }
}
