import mongoose, { Schema } from 'mongoose';
import { IBlockedUser, IFollowers, IFollowing } from './flock-schema';

export type IUser = {
  avatar: String;
  name: String;
  username: String;
  password?: String;
  email: String;
  dateOfBirth: Date;
  createdAt: Date;
  tagline: String;
  banner: String;
  location: String;
  quacks: Schema.Types.ObjectId[];
  reQuacks: Number;
  following: IFollowing[];
  followers: IFollowers[];
  usersBlocked: IBlockedUser[];
};

export interface IUserModel extends mongoose.Model<IUserDoc> {
  build(item: IUser): IUserDoc;
}

export interface IUserDoc extends mongoose.Document {
  avatar: String;
  name: String;
  username: String;
  password?: String;
  email: String;
  dateOfBirth: Date;
  createdAt: Date;
  tagline: String;
  banner: String;
  location: String;
  quacks: Schema.Types.ObjectId[];
  reQuacks: Number;
  following: IFollowing[];
  followers: IFollowers[];
  usersBlocked: IBlockedUser[];
}
