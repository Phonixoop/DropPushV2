import { Types } from 'mongoose';
export declare class CreatePlatformInput {
    platformType: string;
    appId: string;
    project: Types.ObjectId;
    user: Types.ObjectId;
}
