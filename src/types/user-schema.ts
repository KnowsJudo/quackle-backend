import mongoose from 'mongoose';

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
  biography: String;
  quacks: Number;
  likedQuacks: String[];
  following: String[];
  followers: String[];
  usersBlocked: String[];
  ipAddress: String;
  disabled: Boolean;
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
  biography: String;
  quacks: Number;
  likedQuacks: String[];
  following: String[];
  followers: String[];
  usersBlocked: String[];
  ipAddress: String;
  disabled: Boolean;
}
