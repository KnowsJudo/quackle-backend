import express, { Request, Response } from 'express';
import { getTweets, newTweet } from '../models/tweets-model';
import { ITweet } from '../types/schema';

const router = express.Router();

router.get('/api/tweet', async (req: Request, res: Response) => {
  await getTweets().then((tweet: ITweet[]) => {
    return res.status(201).send(tweet);
  });
});

// Tweet
router.post('/api/tweet', async (req: Request, res: Response) => {
  const { message } = req.body;

  await newTweet(message).then((tweet: ITweet) => {
    return res.status(201).send(tweet);
  });
});

export { router as tweetRouter };
