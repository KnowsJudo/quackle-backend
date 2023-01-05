import mongoose, { Schema } from 'mongoose';

export interface IQuack {
  user: Schema.Types.ObjectId;
  name: String;
  username: String;
  message: String;
  atUser: String;
  quackedAt: Date;
  likes: String[];
}

export interface IQuackModel extends mongoose.Model<IQuackDoc> {
  build(item: IQuack): IQuackDoc;
}

export interface IQuackDoc extends mongoose.Document {
  user: Schema.Types.ObjectId;
  name: String;
  username: String;
  message: String;
  atUser: String;
  quackedAt: Date;
  likes: String[];
}
