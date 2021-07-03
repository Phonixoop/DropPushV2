import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import {
  UserAlreadyExistsError,
  UsernameOrPasswordIncorrect,
} from './errors/error';
import { Response } from 'express';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import { Env } from './../environments/environment';
import { LoginUserInput } from './dto/login-user.input';

import { truncate } from 'fs';
interface IReqResponse {
  status: number;
  ok: boolean;
  message?: string;
  data?: any;
}
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly User: Model<User>) {}

  public async create(
    input: CreateUserInput,
    res: Response,
  ): Promise<IReqResponse> {
    let result: IReqResponse;

    try {
      const userExistence = await this.User.findOne({
        email: input.email,
      });
      if (userExistence) {
        return new UserAlreadyExistsError(userExistence);
      }

      const user = new this.User(input);
      user.password = await this.EncodePassword(user);

      const refreshToken = await this.GenerateRefreshAuthToken(user);
      const accessToken = await this.GenerateRefreshAuthToken(user);
      user.token = refreshToken;
      await user.save();
      res.cookie('token', refreshToken, {
        expires: new Date(Date.now() + 60000000),
        secure: true, // set to true if your using https
        httpOnly: true,
      });

      res.header('x-access-token', accessToken);
      result = {
        status: 201,
        ok: true,
      };
    } catch (error) {
      result = {
        status: 400,
        ok: false,
        message: error,
      };
    }

    return Promise.resolve(result);
  }

  public async login(
    input: LoginUserInput,
    res: Response,
  ): Promise<IReqResponse> {
    let result: IReqResponse;
    try {
      const user = await this.FindByCredentials(input.email, input.password);
      if (!user) {
        return new UsernameOrPasswordIncorrect();
      }
      const refreshToken = await this.GenerateRefreshAuthToken(user);
      const accessToken = await this.GenerateAccessAuthToken(user);
      user.token = refreshToken;
      await user.save();
      res.cookie('token', refreshToken, {
        expires: new Date(Date.now() + 60000000),
        secure: true, // set to true if your using https
        httpOnly: true,
      });

      res.header('x-access-token', accessToken);
      result = {
        status: 201,
        ok: true,
      };
      return result;
    } catch (e) {
      result = {
        status: 201,
        ok: true,
      };

      return result;
    }
  }

  public async logout(user: User, res: Response) {
    try {
      res.clearCookie('token');
      user.token = '';

      await user.save();
      return { ok: true, status: 200 };
    } catch {
      return { ok: false, status: 400 };
    }
  }

  // functions

  public async FindByCredentials(email: string, password: string) {
    try {
      const user = await this.User.findOne({ email });

      if (!user) return undefined;
      const match = await bcrypt.compare(password, user?.password || '');
      if (match) {
        return Promise.resolve(user);
      }
    } catch {
      return undefined;
    }
  }

  public async FindByIdAndToken(_id: string, token: string) {
    try {
      const user = await this.User.findOne({ _id, token });
      if (!user) return Promise.reject();
      return Promise.resolve(user);
    } catch {
      return Promise.reject();
    }
  }

  public async GenerateRefreshAuthToken(user: User) {
    // This method simply generates a 64byte hex string - it doesn't save it to the database. saveSessionToDatabase() does that.
    return new Promise<string>((resolve, reject) => {
      const expiration = Env.RefreshTokenExpireTime;
      jwt.sign(
        { _id: user._id },
        Env.JWT_USER_SESSION_REFRESH_SECRET || '',
        {
          expiresIn: '30d',
        },
        (err, token: string) => {
          if (!err) {
            resolve(token);
          } else {
            // there is an error
            reject();
          }
        },
      );
    });
  }

  public async GenerateAccessAuthToken(user: User) {
    // This method simply generates a 64byte hex string - it doesn't save it to the database. saveSessionToDatabase() does that.
    return new Promise<string>((resolve, reject) => {
      // Create the JSON Web Token and return that

      jwt.sign(
        { id: user._id, email: user.email },
        Env.JWT_USER_ACCESS_SECRET,
        { expiresIn: Env.AccessAuthTokenExpireTime },
        (err, token: string) => {
          if (!err) {
            resolve(token);
          } else {
            // there is an error
            reject();
          }
        },
      );
    });
  }

  public async EncodePassword(user: User): Promise<string> {
    let costFactor = 10;
    return await bcrypt.hash(user.password, costFactor);
  }
  // end
}
