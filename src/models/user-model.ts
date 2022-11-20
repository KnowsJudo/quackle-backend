import mongoose, { Schema } from 'mongoose';
import { IUser, IUserModel, IUserDoc } from '../types/user-schema';

const userSchema: Schema<IUserDoc> = new mongoose.Schema({
  displayPic: { type: String },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date },
  createdAt: { type: Date },
  tagline: { type: String },
  quacks: { type: Number },
  reQuacks: { type: Number },
  following: { type: [] },
  followers: { type: [] },
  usersBlocked: { type: [] },
});

userSchema.statics.build = (user: IUser) => {
  return new User(user);
};

const User = mongoose.model<any, IUserModel>('User', userSchema);

export const findOneUser = async (username: String) => {
  const matchedUser = await User.findOne({
    username,
  });
  return matchedUser;
};

export { User };
