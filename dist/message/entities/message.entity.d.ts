import { Document, Model } from 'mongoose';
export declare class Message extends Document {
    title: string;
    iconUrl: string;
    message: string;
    projectId: string;
    platformType: string;
    appId: string;
    expireDate?: Date;
    messageId: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const MessageEntitySchema: import("mongoose").Schema<Message, Model<any, any, any>, undefined>;
