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
  avatar: { type: Buffer },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  tagline: { type: String },
  followingSince: { type: Date },
});

followingSchema.statics.build = (item: IFollowing) => new Following(item);

export const Following = mongoose.model<any, IFollowingModel>(
  'Following',
  followingSchema,
);

const followersSchema: Schema<IFollowersDoc> = new mongoose.Schema({
  username: { type: String, required: true, unique: false },
  followerName: { type: String, required: true },
  followerUsername: { type: String, required: true, unique: true },
  followerAvatar: {
    type: Buffer,
    required: false,
    default: null,
    sparse: true,
  },
  followerTagline: {
    type: String,
    required: false,
    default: null,
    sparse: true,
  },
  followerSince: { type: Date, required: true },
});

followersSchema.statics.build = (item: IFollowers) => new Follower(item);

export const Follower = mongoose.model<any, IFollowersModel>(
  'Followers',
  followersSchema,
);
