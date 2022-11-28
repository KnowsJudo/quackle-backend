import { Quack } from '../models/quacks-model';
import { User } from '../models/user-model';

export const newUser = async ({
  name,
  username,
  email,
  password,
}: {
  name: string;
  username: string;
  email: string;
  password: string;
}) => {
  const user = User.build({
    displayPic: '',
    name,
    username,
    password,
    email,
    dateOfBirth: new Date(),
    createdAt: new Date(),
    tagline: '',
    quacks: [],
    reQuacks: 0,
    following: [],
    followers: [],
    usersBlocked: [],
  });
  await user.save();
  return user;
};

export const getUsers = async (limit: number) => await User.find().limit(limit);

export const findOneUser = async (username: string) =>
  await User.findOne({ username });

export const deleteUsersQuacks = async (id: string) =>
  await Quack.find({ user: id }).deleteMany({});
