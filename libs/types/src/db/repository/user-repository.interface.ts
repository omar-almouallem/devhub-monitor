import { IUserSchema } from '../collection/user-schema';
import { IInsertUserInput, IUpdateUserInput } from '../../dto';

export interface IUserRepository {
  getUserByEmail(email: string): Promise<IUserSchema | undefined>;
  insertUser(data: IInsertUserInput): Promise<IUserSchema>;
  insertToken(id: string, token: string): Promise<IUserSchema>;
  updateUserById(id: string, data: IUpdateUserInput): Promise<IUserSchema>;
  insertGitHubData(
    id: string,
    data: Partial<IUserSchema>,
  ): Promise<IUpdateUserInput>;
  getAveragePRsByProject(userId: string, projectNames: string[]);
  getAveragePRsByUser(userId: string, userName: string);
  getAveragePRsByDate(
    userId: string,
    projectName: string,
    startTime: Date,
    endTime: Date,
  );
}
