import mongoose from 'mongoose';

export interface IFollowing {
  username: String;
  followingName: String;
  followingUsername: String;
  followingAvatar?: Buffer;
  followingTagline?: String;
  followingSince: Date;
}

export interface IFollowingModel extends mongoose.Model<IFollowingDoc> {
  build(item: IFollowing): IFollowingDoc;
}

export interface IFollowingDoc extends mongoose.Document {
  username: String;
  followingName: String;
  followingUsername: String;
  followingAvatar?: Buffer;
  followingTagline?: String;
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
