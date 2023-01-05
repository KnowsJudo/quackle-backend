import { Schema } from 'mongoose';
import { Quack } from '../models/quacks-model';

export const newQuack = async (props: {
  user: Schema.Types.ObjectId;
  name: string;
  username: string;
  message: string;
  atUser: string;
}) => {
  const quack = Quack.build({
    ...props,
    quackedAt: new Date(),
    likes: [],
  });
  await quack.save();
  return quack;
};

export const getQuacks = async (username: string) =>
  await Quack.find({ username }).limit(20);

export const getOneQuack = async (id: String) => Quack.findById(id);
