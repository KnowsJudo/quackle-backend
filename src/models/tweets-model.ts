import mongoose from 'mongoose';
import { ITweet, ITweetModel, IUser } from '../types/schema';

const tweetSchema = new mongoose.Schema({
  // user: { type: IUser, required: true },
  message: { type: String, required: true },
});

tweetSchema.statics.build = (item: ITweet) => {
  return new Tweet(item);
};

const Tweet = mongoose.model<any, ITweetModel>('Tweet', tweetSchema);

// elper functions
export const newTweet = async (message: string) => {
  const tweet = Tweet.build({
    message: message,
  });
  await tweet.save();
  return tweet;
};

export const getTweets = async () => {
  const tweets = await Tweet.find({});
  return tweets;
};
