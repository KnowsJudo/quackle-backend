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
  username: { type: String, required: true, unique: false },
  followingName: { type: String, required: true },
  followingUsername: { type: String, required: true, unique: true },
  followingAvatar: {
    type: Buffer,
    required: false,
    default: null,
    sparse: true,
  },
  followingTagline: {
    type: String,
    required: false,
    default: null,
    sparse: true,
  },
  followingSince: { type: Date, required: true },
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
