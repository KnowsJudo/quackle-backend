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

const Following = mongoose.model<any, IFollowingModel>(
  'Following',
  followingSchema,
);

// Helper functions
export const newFollowing = async ({
  displayPic,
  name,
  username,
  tagline,
}: {
  displayPic: string;
  name: string;
  username: string;
  tagline: string;
}) => {
  const following = Following.build({
    displayPic,
    name,
    username,
    tagline,
    followingSince: new Date(),
  });
  await following.save();
  return following;
};

export const getFollowing = async (username: string) =>
  await Following.find({ username }).limit(20);

export const getOneFollowing = async (id: String) =>
  await Following.findById(id);

const followersSchema: Schema<IFollowersDoc> = new mongoose.Schema({
  displayPic: { type: String },
  name: { type: String, required: true },
  username: { type: String, required: true },
  tagline: { type: String },
  followerSince: { type: Date, required: true },
});

followersSchema.statics.build = (item: IFollowers) => new Follower(item);

const Follower = mongoose.model<any, IFollowersModel>(
  'Followers',
  followersSchema,
);

// Helper functions
export const newFollower = async ({
  displayPic,
  name,
  username,
  tagline,
}: {
  displayPic: string;
  name: string;
  username: string;
  tagline: string;
}) => {
  const follower = Follower.build({
    displayPic,
    name,
    username,
    tagline,
    followerSince: new Date(),
  });
  await follower.save();
  return follower;
};

export const getFollowers = async (username: string) => {
  const followers = await Follower.find({ username }).limit(20);
  return followers;
};

export const getOneFollower = async (id: String) => {
  const followers = await Follower.findById(id);
  return followers;
};
