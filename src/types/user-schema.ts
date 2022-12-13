import mongoose from 'mongoose';
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
  quacks: Number;
  reQuacks: Number;
  following: String[];
  followers: String[];
  usersBlocked: String[];
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
  quacks: Number;
  reQuacks: Number;
  following: String[];
  followers: String[];
  usersBlocked: String[];
}
