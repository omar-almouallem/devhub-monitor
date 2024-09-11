import { NoPullRequestsFoundError } from '@dev-hub-monitor/types';
import { MongoTodoRepository } from '../infra/repositories/users-repositories';

export class UserDataService {
  userRepository: MongoTodoRepository;
  constructor () {
    this.userRepository = new MongoTodoRepository();
  }
  async getUserData (id: string) {
    const userData = await this.userRepository.getUserById(id);
    return userData;
  }
  async avregePRsByProject (userId: string, projectNames: string[]) {
    const result = await this.userRepository.getAveragePRsByProject(
      userId,
      projectNames,
    );
    if (!result) {
      throw new NoPullRequestsFoundError();
    }
    return result;
  }
  async avregePRsByName (userId: string, userName: string) {
    const result = await this.userRepository.getAveragePRsByUser(
      userId,
      userName,
    );
    if (!result) {
      throw new NoPullRequestsFoundError();
    }
    return result;
  }
  async avregePRsByDate (
    userId: string,
    projectName: string,
    startTime: Date,
    endTime: Date,
  ) {
    const result = await this.userRepository.getAveragePRsByDate(
      userId,
      projectName,
      startTime,
      endTime,
    );
    if (!result) {
      throw new NoPullRequestsFoundError();
    }
    return result;
  }
}
