import mongoose, { Schema } from 'mongoose';
import { IQuack, IQuackDoc, IQuackModel } from '../types/quack-schema';

const quackSchema: Schema<IQuackDoc> = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  username: { type: String, required: true },
  avatar: { type: String },
  content: { type: String, required: true },
  atUsers: [{ type: String }],
  quackedAt: { type: Date, required: true },
  likes: [{ type: String }],
  replies: [{ type: Schema.Types.ObjectId, ref: 'Quack' }],
});

quackSchema.statics.build = (item: IQuack) => new Quack(item);

export const Quack = mongoose.model<any, IQuackModel>('Quack', quackSchema);
