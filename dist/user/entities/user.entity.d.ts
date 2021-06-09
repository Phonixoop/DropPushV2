import { Types, Document, Model } from 'mongoose';
export declare class User extends Document {
    username: string;
    password: string;
    email: string;
    projectsIds?: [Types.ObjectId];
    token?: string;
    createdAt: Date;
    updatedAt: Date;
    GenerateRefreshAuthToken(user: User): Promise<string>;
    GenerateAccessAuthToken(user: User): Promise<string>;
}
export declare const UserEntitySchema: import("mongoose").Schema<User, Model<any, any, any>, undefined>;
