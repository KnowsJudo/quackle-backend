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

export const findOneUser = async (id: String) => await User.findById(id);
