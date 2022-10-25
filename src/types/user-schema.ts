import mongoose from 'mongoose';

export interface IUser {
  displayPic: String;
  name: String;
  username: String;
  password: String;
  email: String;
  dateOfBirth: Date;
  createdAt: Date;
  // accountData: {
  //   quacks: Number;
  //   reQuacks: Number;
  //   usersFriend: IUser[];
  //   usersBlocked: IUser[];
  // };
}

export interface IUserModel extends mongoose.Model<IUserDoc> {
  build(item: IUser): IUserDoc;
}

export interface IUserDoc extends mongoose.Document {
  displayPic: String;
  name: String;
  username: String;
  password: String;
  email: String;
  dateOfBirth: Date;
  createdAt: Date;
}
