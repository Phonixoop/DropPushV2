import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document, Mongoose, Model } from 'mongoose';

import { Env } from 'src/environments/environment';
import jwt from 'jsonwebtoken';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: false })
  username!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true, unique: true, index: true })
  email!: string;

  // @Prop({
  //   type: [Types.ObjectId],
  //   required: false,
  //   unique: true,
  //   ref: 'projects',
  // })
  // projects?: Types.ObjectId[];

  @Prop({ required: false })
  token?: string;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;

  public async GenerateRefreshAuthToken(user: User) {
    // This method simply generates a 64byte hex string - it doesn't save it to the database. saveSessionToDatabase() does that.
    return new Promise<string>((resolve, reject) => {
      const expiration = Env.JWT_USER_SESSION_REFRESH_SECRET;
      jwt.sign(
        { _id: user._id },
        Env.JWT_USER_SESSION_REFRESH_SECRET || '',
        {
          expiresIn: expiration,
        },
        (err, token: string) => {
          if (!err) {
            resolve(token);
          } else {
            // there is an error
            reject();
          }
        },
      );
    });
  }

  public async GenerateAccessAuthToken(user: User) {
    // This method simply generates a 64byte hex string - it doesn't save it to the database. saveSessionToDatabase() does that.
    return new Promise<string>((resolve, reject) => {
      // Create the JSON Web Token and return that
      const expiration = Env.AccessAuthTokenExpireTime;
      jwt.sign(
        { _id: user._id, displayname: user._id, email: user.email },
        Env.JWT_USER_ACCESS_SECRET || '',
        { expiresIn: expiration },
        (err, token: string) => {
          if (!err) {
            resolve(token);
          } else {
            // there is an error
            reject();
          }
        },
      );
    });
  }
}
export const UserEntitySchema = SchemaFactory.createForClass(User);
