import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { Response } from 'express';
import { LoginUserInput } from './dto/login-user.input';
interface IReqResponse {
    status: number;
    ok: boolean;
    message?: string;
    data?: any;
}
export declare class UserService {
    private readonly User;
    constructor(User: Model<User>);
    create(input: CreateUserInput, res: Response): Promise<IReqResponse>;
    login(input: LoginUserInput, res: Response): Promise<IReqResponse>;
    logout(user: User, res: Response): Promise<{
        ok: boolean;
        status: number;
    }>;
    FindByCredentials(email: string, password: string): Promise<User>;
    FindByIdAndToken(_id: string, token: string): Promise<User>;
    GenerateRefreshAuthToken(user: User): Promise<string>;
    GenerateAccessAuthToken(user: User): Promise<string>;
    EncodePassword(user: User): Promise<string>;
}
export {};
