import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { Response, Request } from 'express';
import { LoginUserInput } from './dto/login-user.input';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserInput: CreateUserInput, res: Response): Promise<void>;
    login(loginUserInput: LoginUserInput, res: Response): Promise<void>;
    acessToken(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
