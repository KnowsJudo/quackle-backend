import mongoose, { Schema } from 'mongoose';
import { IBlockedUser, IFollowers, IFollowing } from './flock-schema';
import { IImage } from './image-schema';

export type IUser = {
  avatar: IImage;
  name: String;
  username: String;
  password?: String;
  email: String;
  dateOfBirth: Date;
  createdAt: Date;
  tagline: String;
  banner: IImage;
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
  avatar: IImage;
  name: String;
  username: String;
  password?: String;
  email: String;
  dateOfBirth: Date;
  createdAt: Date;
  tagline: String;
  banner: IImage;
  location: String;
  quacks: Schema.Types.ObjectId[];
  reQuacks: Number;
  following: IFollowing[];
  followers: IFollowers[];
  usersBlocked: IBlockedUser[];
}
