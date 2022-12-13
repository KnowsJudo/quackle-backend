import { Quack } from '../models/quacks-model';
import { User } from '../models/user-model';
import { Image } from '../models/image-model';

export const newUser = async (props: {
  name: string;
  username: string;
  email: string;
  password: string;
}) => {
  const user = User.build({
    avatar: new Image(),
    ...props,
    dateOfBirth: new Date(),
    createdAt: new Date(),
    tagline: '',
    banner: new Image(),
    location: '',
    quacks: 0,
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
  await Quack.deleteMany({ user: id });
