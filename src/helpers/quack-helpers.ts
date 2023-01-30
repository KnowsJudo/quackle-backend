import { Schema } from 'mongoose';
import { Quack } from '../models/quacks-model';

export const newQuack = async (props: {
  userId: Schema.Types.ObjectId;
  name: string;
  username: string;
  content: string;
  avatar?: string;
  atUsers: string[];
}) => {
  const quack = Quack.build({
    ...props,
    quackedAt: new Date(),
    likes: [],
    replies: [],
  });
  await quack.save();
  return quack;
};

export const getQuacks = async (username: string) =>
  await Quack.find({ username }).sort({ quackedAt: -1 });

export const getOneQuack = async (id: String) => Quack.findById(id);
