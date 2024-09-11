import { IUserSchema } from '@dev-hub-monitor/types';

export class UserMapper {
  static dbToJSON(user: IUserSchema) {
    return {
      id: user._id,
      email: user.email,
    };
  }
}
