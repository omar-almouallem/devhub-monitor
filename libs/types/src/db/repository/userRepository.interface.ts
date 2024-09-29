import { IUserSchema } from '../collection/user-schema';
import { IInsertUserInput, IUpdateUserInput } from '../../dto';

export interface IUserRepository {
  getUserByEmail(email: string): Promise<IUserSchema | undefined>;
  insertUser(data: IInsertUserInput): Promise<IUserSchema>;
  insertToken(id: string, token: string): Promise<IUserSchema>;
  updateUserById(id: string, data: IUpdateUserInput): Promise<IUserSchema>;
  getUserById(id: string): Promise<IUserSchema>;
  getAllUser(): Promise<IUserSchema[]>;
}
