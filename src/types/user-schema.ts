import mongoose from 'mongoose';
import { IBlockedUser, IFollowers, IFollowing } from './flock-schema';

export type IUser = {
  displayPic: String;
  name: String;
  username: String;
  password?: String;
  email: String;
  dateOfBirth: Date;
  createdAt: Date;
  tagline: String;
  quacks: Number;
  reQuacks: Number;
  following: IFollowing[];
  followers: IFollowers[];
  usersBlocked: IBlockedUser[];
};

export interface IUserModel extends mongoose.Model<IUserDoc> {
  build(item: IUser): IUserDoc;
}

export interface IUserDoc extends mongoose.Document {
  displayPic: String;
  name: String;
  username: String;
  password?: String;
  email: String;
  dateOfBirth: Date;
  createdAt: Date;
  tagline: String;
  quacks: Number;
  reQuacks: Number;
  following: IFollowing[];
  followers: IFollowers[];
  usersBlocked: IBlockedUser[];
}
