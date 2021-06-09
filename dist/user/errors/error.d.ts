import { User } from '../entities/user.entity';
export declare class UserAlreadyExistsError extends Error {
    message: string;
    status: number;
    ok: boolean;
    data?: any;
    constructor(user?: User);
}
export declare class UsernameOrPasswordIncorrect extends Error {
    message: string;
    status: number;
    ok: boolean;
    data?: any;
    constructor(user?: User);
}
