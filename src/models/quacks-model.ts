import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/user-schema';
import { IQuack, IQuackDoc, IQuackModel } from '../types/quack-schema';
import { findOneUser } from './user-model';

const quackSchema: Schema<IQuackDoc> = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  id: { type: Number, required: true },
});

quackSchema.statics.build = (item: IQuack) => {
  return new Quack(item);
};

const Quack = mongoose.model<any, IQuackModel>('Quack', quackSchema);

// Helper functions
export const newQuack = async (message: string) => {
  const foundUser = await findOneUser('BKHZ');
  const quack = Quack.build({
    username: foundUser ? foundUser.username : 'user not found',
    message: message,
  });
  await quack.save();
  return quack;
};

export const getQuacks = async () => {
  const quacks = await Quack.find({}).limit(20);
  return quacks;
};

export const getOneQuack = async (id: String) => {
  const quacks = await Quack.findById(id);
  return quacks;
};
