import mongoose from 'mongoose';
import { IUserDoc } from './user-schema';

export interface IQuack {
  username: String;
  message: String;
}

export interface IQuackModel extends mongoose.Model<IQuackDoc> {
  build(item: IQuack): IQuackDoc;
}

export interface IQuackDoc extends mongoose.Document {
  username: String;
  message: String;
}
