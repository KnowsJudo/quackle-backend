import mongoose from 'mongoose';

export interface IFollowing {
  displayPic: String;
  name: String;
  username: String;
  tagline: String;
  followingSince: Date;
}

export interface IFollowingModel extends mongoose.Model<IFollowingDoc> {
  build(item: IFollowing): IFollowingDoc;
}

export interface IFollowingDoc extends mongoose.Document {
  displayPic: String;
  name: String;
  username: String;
  tagline: String;
  followingSince: Date;
}

export interface IFollowers {
  displayPic: String;
  name: String;
  username: String;
  tagline: String;
  followerSince: Date;
}

export interface IFollowersModel extends mongoose.Model<IFollowersDoc> {
  build(item: IFollowers): IFollowersDoc;
}

export interface IFollowersDoc extends mongoose.Document {
  displayPic: String;
  name: String;
  username: String;
  tagline: String;
  followerSince: Date;
}

export interface IBlockedUser {
  displayPic: String;
  name: String;
  username: String;
  tagline: String;
  blockedSince: Date;
  reasonBlocked?: String;
}
