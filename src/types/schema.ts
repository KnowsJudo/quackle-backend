import mongoose from 'mongoose';

//users, tweets, profiles
export interface IUser {
  displayPic: String;
  name: String;
  userName: String;
  createdAt: Date;
}

export interface ITodo {
  title: string;
  description: string;
}

export interface ITodoModel extends mongoose.Model<ITodoDoc> {
  build(item: ITodo): ITodoDoc;
}

export interface ITodoDoc extends mongoose.Document {
  title: string;
  description: string;
}

export interface ITweet {
  message: string;
}

export interface ITweetModel extends mongoose.Model<ITweetDoc> {
  build(item: ITweet): ITweetDoc;
}

export interface ITweetDoc extends mongoose.Document {
  message: string;
}
