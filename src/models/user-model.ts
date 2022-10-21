import mongoose from 'mongoose';
import { IUser } from '../types/schema';

interface IUserModel extends mongoose.Model<IUserDoc> {
  build(item: IUser): IUserDoc;
}

interface IUserDoc extends mongoose.Document {
  displayPic: String;
  name: String;
  userName: String;
  createdAt: Date;
}

const userSchema = new mongoose.Schema({
  displayPic: { type: String },
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  createdAt: { type: Date },
});

userSchema.statics.build = (user: IUser) => {
  return new User(user);
};

const User = mongoose.model<any, IUserModel>('User', userSchema);

export { User };
