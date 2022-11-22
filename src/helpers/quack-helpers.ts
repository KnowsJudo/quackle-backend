import { Schema } from 'mongoose';
import { Quack } from '../models/quacks-model';
import { User } from '../models/user-model';

export const newQuack = async ({
  user,
  name,
  username,
  message,
}: {
  user: Schema.Types.ObjectId;
  name: string;
  username: string;
  message: string;
}) => {
  const quack = Quack.build({
    user,
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
