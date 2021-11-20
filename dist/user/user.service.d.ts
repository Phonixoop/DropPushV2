import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { Response } from 'express';
import { LoginUserInput } from './dto/login-user.input';
import * as mongoose from 'mongoose';
import { APIResponse } from 'src/model';
export declare class UserService {
    private readonly User;
    constructor(User: Model<User>);
    create(input: CreateUserInput, res: Response): Promise<APIResponse>;
    login(input: LoginUserInput, res: Response): Promise<APIResponse>;
    logout(user: User, res: Response): Promise<{
        ok: boolean;
        status: number;
    }>;
    FindByCredentials(email: string, password: string): Promise<User & {
        _id: any;
    }>;
    FindByIdAndToken(_id: string, token: string): Promise<User & {
        _id: any;
    }>;
    FindById(_id: string, session: mongoose.ClientSession): Promise<User & {
        _id: any;
    }>;
    GenerateRefreshAuthToken(user: User): Promise<string>;
    GenerateAccessAuthToken(user: User): Promise<string>;
    EncodePassword(user: User): Promise<string>;
}
