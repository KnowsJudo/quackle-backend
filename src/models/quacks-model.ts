import mongoose, { Schema } from 'mongoose';
import { IQuack, IQuackDoc, IQuackModel } from '../types/quack-schema';

const quackSchema: Schema<IQuackDoc> = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  message: { type: String, required: true },
  quackedAt: { type: Date, required: true },
});

quackSchema.statics.build = (item: IQuack) => new Quack(item);

const Quack = mongoose.model<any, IQuackModel>('Quack', quackSchema);

// Helper functions
export const newQuack = async ({
  name,
  username,
  message,
}: {
  name: string;
  username: string;
  message: string;
}) => {
  const quack = Quack.build({
    name,
    username,
    message,
    quackedAt: new Date(),
  });
  await quack.save();
  return quack;
};

export const getQuacks = async (username: string) =>
  await Quack.find({ username }).limit(20);

export const getOneQuack = async (id: String) => await Quack.findById(id);
