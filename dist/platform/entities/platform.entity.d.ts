import { Types, Document, Model } from 'mongoose';
export declare class Platform extends Document {
    appId: string;
    platformType: string;
    user: Types.ObjectId;
    project: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const PlatformEntitySchema: import("mongoose").Schema<Platform, Model<any, any, any>, undefined>;
