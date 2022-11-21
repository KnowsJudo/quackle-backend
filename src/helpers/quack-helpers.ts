import { Quack } from '../models/quacks-model';

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
