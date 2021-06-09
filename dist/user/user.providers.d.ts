import { Connection } from 'mongoose';
export declare const usersProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<import("./entities/user.entity").User, {}, {}>;
    inject: string[];
}[];
