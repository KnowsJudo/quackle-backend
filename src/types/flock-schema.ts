import mongoose from 'mongoose';

export interface IFollowing {
  avatar: String;
  name: String;
  username: String;
  tagline: String;
  followingSince: Date;
}

export interface IFollowingModel extends mongoose.Model<IFollowingDoc> {
  build(item: IFollowing): IFollowingDoc;
}

export interface IFollowingDoc extends mongoose.Document {
  avatar: String;
  name: String;
  username: String;
  tagline: String;
  followingSince: Date;
}

export interface IFollowers {
  avatar: String;
  name: String;
  username: String;
  tagline: String;
  followerSince: Date;
}

export interface IFollowersModel extends mongoose.Model<IFollowersDoc> {
  build(item: IFollowers): IFollowersDoc;
}

export interface IFollowersDoc extends mongoose.Document {
  avatar: String;
  name: String;
  username: String;
  tagline: String;
  followerSince: Date;
}

export interface IBlockedUser {
  avatar: String;
  name: String;
  username: String;
  tagline: String;
  blockedSince: Date;
  reasonBlocked?: String;
}
