import mongoose from 'mongoose';
import { IUserDoc } from './user-schema';

export interface IQuack {
  name: String;
  username: String;
  message: String;
  quackedAt: Date;
}

export interface IQuackModel extends mongoose.Model<IQuackDoc> {
  build(item: IQuack): IQuackDoc;
}

export interface IQuackDoc extends mongoose.Document {
  name: String;
  username: String;
  message: String;
  quackedAt: Date;
}
