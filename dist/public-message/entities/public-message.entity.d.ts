import { Document, Model } from 'mongoose';
export declare class PublicMessage extends Document {
    title: string;
    iconUrl: string;
    message: string;
    platformType: string;
    expireDate?: Date;
    messageId: string;
    VipUser: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const PublicMessageEntitySchema: import("mongoose").Schema<PublicMessage, Model<any, any, any>, undefined>;
