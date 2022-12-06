import mongoose, { Schema } from 'mongoose';
import { IUser, IUserModel, IUserDoc } from '../types/user-schema';

const userSchema: Schema<IUserDoc> = new mongoose.Schema({
  avatar: { type: Schema.Types.ObjectId, ref: 'Image' },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date },
  createdAt: { type: Date },
  tagline: { type: String },
  banner: { type: String },
  location: { type: String },
  quacks: [{ type: Schema.Types.ObjectId, ref: 'Quack' }],
  reQuacks: { type: Number },
  following: { type: [] },
  followers: { type: [] },
  usersBlocked: { type: [] },
});

userSchema.statics.build = (user: IUser) => new User(user);

export const User = mongoose.model<any, IUserModel>('User', userSchema);
