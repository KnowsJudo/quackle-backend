import mongoose, { Schema } from 'mongoose';

export interface IFollowing {
  avatar: Buffer;
  name: String;
  username: String;
  tagline: String;
  followingSince: Date;
}

export interface IFollowingModel extends mongoose.Model<IFollowingDoc> {
  build(item: IFollowing): IFollowingDoc;
}

export interface IFollowingDoc extends mongoose.Document {
  avatar: Buffer;
  name: String;
  username: String;
  tagline: String;
  followingSince: Date;
}

export interface IFollowers {
  username: String;
  followerName: String;
  followerUsername: String;
  followerAvatar?: Buffer;
  followerTagline?: String;
  followerSince: Date;
}

export interface IFollowersModel extends mongoose.Model<IFollowersDoc> {
  build(item: IFollowers): IFollowersDoc;
}

export interface IFollowersDoc extends mongoose.Document {
  username: String;
  followerName: String;
  followerUsername: String;
  followerAvatar?: Buffer;
  followerTagline?: String;
  followerSince: Date;
}

export interface IBlockedUser {
  avatar: Buffer;
  name: String;
  username: String;
  tagline: String;
  blockedSince: Date;
  reasonBlocked?: String;
}
