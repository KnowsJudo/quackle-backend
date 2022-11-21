import mongoose, { Schema } from 'mongoose';
import {
  IFollowing,
  IFollowingDoc,
  IFollowingModel,
  IFollowers,
  IFollowersModel,
  IFollowersDoc,
} from '../types/flock-schema';

const followingSchema: Schema<IFollowingDoc> = new mongoose.Schema({
  displayPic: { type: String },
  name: { type: String, required: true },
  username: { type: String, required: true },
  tagline: { type: String },
  followingSince: { type: Date, required: true },
});

followingSchema.statics.build = (item: IFollowing) => new Following(item);

export const Following = mongoose.model<any, IFollowingModel>(
  'Following',
  followingSchema,
);

const followersSchema: Schema<IFollowersDoc> = new mongoose.Schema({
  displayPic: { type: String },
  name: { type: String, required: true },
  username: { type: String, required: true },
  tagline: { type: String },
  followerSince: { type: Date, required: true },
});

followersSchema.statics.build = (item: IFollowers) => new Follower(item);

export const Follower = mongoose.model<any, IFollowersModel>(
  'Followers',
  followersSchema,
);
