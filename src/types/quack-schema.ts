import mongoose, { Schema } from 'mongoose';

export interface IQuack {
  userId: Schema.Types.ObjectId;
  name: String;
  username: String;
  avatar?: String;
  content: String;
  atUsers: String[];
  quackedAt: Date;
  likes: String[];
  parentQuackId?: Schema.Types.ObjectId;
  replies: IQuack[];
}

export interface IQuackModel extends mongoose.Model<IQuackDoc> {
  build(item: IQuack): IQuackDoc;
}

export interface IQuackDoc extends mongoose.Document {
  userId: Schema.Types.ObjectId;
  name: String;
  username: String;
  avatar?: String;
  content: String;
  atUsers: String[];
  quackedAt: Date;
  likes: String[];
  parentQuackId?: Schema.Types.ObjectId;
  replies: IQuack[];
}
