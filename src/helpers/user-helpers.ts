import { Quack } from '../models/quacks-model';
import { User } from '../models/user-model';
import { Image } from '../models/image-model';

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
    avatar: new Image(),
    name,
    username,
    password,
    email,
    dateOfBirth: new Date(),
    createdAt: new Date(),
    tagline: '',
    banner: new Image(),
    location: '',
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
  await User.findOne({ username }).populate('avatar').populate('banner');

export const deleteUsersQuacks = async (id: string) =>
  await Quack.find({ user: id }).deleteMany({});
