import mongoose, { Schema } from 'mongoose';
import { IQuack, IQuackDoc, IQuackModel } from '../types/quack-schema';
import { findOneUser } from './user-model';

const quackSchema: Schema<IQuackDoc> = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  quackedAt: { type: Date, required: true },
});

quackSchema.statics.build = (item: IQuack) => {
  return new Quack(item);
};

const Quack = mongoose.model<any, IQuackModel>('Quack', quackSchema);

// Helper functions
export const newQuack = async (message: string) => {
  //TODO
  const foundUser = await findOneUser('BKHZ');
  const quack = Quack.build({
    username: foundUser ? foundUser.username : 'User not found',
    message: message,
    quackedAt: new Date(),
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
