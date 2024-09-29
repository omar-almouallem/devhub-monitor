import {
  IInsertUserInput,
  IUserRepository,
  IUserSchema,
} from '@dev-hub-monitor/types';
import mongoose from 'mongoose';

import UserModel from '../../models/user';

export class MongoTodoRepository implements IUserRepository {
  async insertUser (user: IInsertUserInput): Promise<IUserSchema> {
    const newUser = {
      _id: new mongoose.Types.ObjectId().toString(),
      ...user,
    };
    await UserModel.create(newUser);
    return this.getUserById(newUser._id);
  }

  async insertToken (id: string, token: string): Promise<IUserSchema> {
    await UserModel.findOneAndUpdate(
      { _id: id },
      { githubToken: token },
      { new: true },
    );
    return this.getUserById(id);
  }

  async updateUserById (
    id: string,
    data: Partial<IUserSchema>,
  ): Promise<IUserSchema> {
    await UserModel.findByIdAndUpdate({ _id: id }, data, { new: true });
    return this.getUserById(id);
  }

  async getAllUser (): Promise<IUserSchema[]> {
    const users = await UserModel.find({});
    return users;
  }

  async getUserByEmail (email: string): Promise<IUserSchema> {
    const user = await UserModel.findOne({ email });
    return user;
  }

  getUserById (id: string): Promise<IUserSchema> {
    const user = UserModel.findById({ _id: id });
    return user;
  }
}
