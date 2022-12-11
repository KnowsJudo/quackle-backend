import { Follower, Following } from '../models/flock-model';

export const newFollowing = async ({
  username,
  followingName,
  followingUsername,
  followingAvatar,
  followingTagline,
}: {
  username: string;
  followingName: string;
  followingUsername: string;
  followingAvatar?: Buffer;
  followingTagline?: string;
}) => {
  const following = Following.build({
    username,
    followingName,
    followingUsername,
    followingAvatar,
    followingTagline,
    followingSince: new Date(),
  });
  await following.save();
  return following;
};

export const getFollowing = async (username: string) =>
  await Following.find({ username }).limit(20);

export const getOneFollowing = async (id: String) =>
  await Following.findById(id);

export const newFollower = async ({
  username,
  followerName,
  followerUsername,
  followerAvatar,
  followerTagline,
}: {
  username: string;
  followerName: string;
  followerUsername: string;
  followerAvatar?: Buffer;
  followerTagline?: string;
}) => {
  const follower = Follower.build({
    username,
    followerName,
    followerUsername,
    followerAvatar,
    followerTagline,
    followerSince: new Date(),
  });
  await follower.save();
  return follower;
};

export const getFollowers = async (username: string) =>
  await Follower.find({ username }).limit(20);

export const getOneFollower = async (id: String) => await Follower.findById(id);
