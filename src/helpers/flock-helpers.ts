import { Follower, Following } from '../models/flock-model';

export const newFollowing = async (props: {
  username: string;
  followingName: string;
  followingUsername: string;
  followingAvatar?: string;
  followingTagline?: string;
}) => {
  const following = Following.build({
    ...props,
    followingSince: new Date(),
  });
  await following.save();
  return following;
};

export const getFollowing = async (username: string) =>
  await Following.find({ username }).limit(20);

export const getOneFollowing = async (id: String) =>
  await Following.findById(id);

export const newFollower = async (props: {
  username: string;
  followerName: string;
  followerUsername: string;
  followerAvatar?: string;
  followerTagline?: string;
}) => {
  const follower = Follower.build({
    ...props,
    followerSince: new Date(),
  });
  await follower.save();
  return follower;
};

export const getFollowers = async (username: string) =>
  await Follower.find({ username }).limit(20);

export const getOneFollower = async (id: String) => await Follower.findById(id);
