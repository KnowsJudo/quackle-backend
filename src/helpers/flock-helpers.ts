import { Follower, Following } from '../models/flock-model';

export const newFollowing = async ({
  avatar,
  name,
  username,
  tagline,
}: {
  avatar: Buffer;
  name: string;
  username: string;
  tagline: string;
}) => {
  const following = Following.build({
    avatar,
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

export const newFollower = async ({
  avatar,
  name,
  username,
  tagline,
}: {
  avatar: Buffer;
  name: string;
  username: string;
  tagline: string;
}) => {
  const follower = Follower.build({
    avatar,
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
