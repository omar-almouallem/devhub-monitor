import moment from 'moment';
import {
  IBasicLoginInput,
  IBasicSignupInput,
  InvalidPasswordError,
  UserAlreadyExistsError,
  UserDoesNotExistError,
} from '@dev-hub-monitor/types';
import { compareWithHash, createJwtToken, hash } from '@dev-hub-monitor/utils';

import { MongoTodoRepository } from '../infra/repositories/userRepositories';
import { UserMapper } from '../lib/mappers/user.mapper';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config';
import {
  ACCESS_TOKEN_TTL_MINS,
  REFRESH_TOKEN_TTL_MONTHS,
} from '../config/constants';

export class AuthService {
  userRepository: MongoTodoRepository;
  constructor () {
    this.userRepository = new MongoTodoRepository();
  }
  async registerUser (input: IBasicSignupInput) {
    const existingUser = await this.userRepository.getUserByEmail(input.email);
    if (existingUser) {
      throw new UserAlreadyExistsError();
    }
    const user = await this.userRepository.insertUser({
      ...input,
      password: await hash(input.password),
      isVerified: false,
    });
    await hash(input.password);
    return user;
  }
  async loginUser (input: IBasicLoginInput) {
    const user = await this.userRepository.getUserByEmail(input.email);
    if (!user) {
      throw new UserDoesNotExistError();
    }
    const isValidPassword = await compareWithHash(
      input.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new InvalidPasswordError();
    }
    const accessTokenTTL = moment
      .duration(ACCESS_TOKEN_TTL_MINS, 'minute')
      .asSeconds();
    const accessToken = createJwtToken(
      UserMapper.dbToJSON(user),
      ACCESS_TOKEN_SECRET,
      accessTokenTTL,
    );

    const refreshTokenTTL = moment
      .duration(REFRESH_TOKEN_TTL_MONTHS, 'months')
      .asSeconds();
    const refreshToken = createJwtToken(
      UserMapper.dbToJSON(user),
      REFRESH_TOKEN_SECRET,
      refreshTokenTTL,
    );
    await this.userRepository.updateUserById(user._id, { refreshToken });
    return {
      accessToken,
      refreshToken,
    };
  }
}
