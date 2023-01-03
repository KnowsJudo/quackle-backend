import mongoose, { Schema } from 'mongoose';
import { IQuack, IQuackDoc, IQuackModel } from '../types/quack-schema';

const quackSchema: Schema<IQuackDoc> = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  username: { type: String, required: true },
  message: { type: String, required: true },
  atUser: { type: String },
  quackedAt: { type: Date, required: true },
});

quackSchema.statics.build = (item: IQuack) => new Quack(item);

export const Quack = mongoose.model<any, IQuackModel>('Quack', quackSchema);
