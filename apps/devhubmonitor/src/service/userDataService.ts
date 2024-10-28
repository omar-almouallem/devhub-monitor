import { MongoTodoRepository } from '../infra/repositories/userRepositories';

export class UserDataService {
  userRepository: MongoTodoRepository;

  constructor () {
    this.userRepository = new MongoTodoRepository();
  }

  async getGitHubStatus (id: string) {
    const user = await this.userRepository.getUserById(id);

    return {
      githubToken: user.githubToken,
      isVerified: user.isVerified,
    };
  }
}
