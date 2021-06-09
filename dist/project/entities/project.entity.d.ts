import { Types, Document, Model } from 'mongoose';
export declare class Project extends Document {
    user: Types.ObjectId;
    nickName: string;
    deviceToken: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ProjectEntitySchema: import("mongoose").Schema<Project, Model<any, any, any>, undefined>;
