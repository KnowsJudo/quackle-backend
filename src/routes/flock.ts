import express, { Request, Response } from 'express';
import {
  getFollowers,
  getFollowing,
  getOneFollower,
  getOneFollowing,
  newFollower,
} from '../helpers/flock-helpers';
import { Follower } from '../models/flock-model';

const router = express.Router();

//List a users following users
router.get(
  '/api/user/:username/following/:id?',
  async (req: Request, res: Response) => {
    try {
      if (!req.params.id) {
        const data = await getFollowing(req.params.username);
        res.status(200).send(data);
      } else {
        const following = await getOneFollowing(req.params.id);
        res.status(200).send(following);
      }
    } catch (error) {
      res.status(500).send({
        message: 'Internal server error',
        error: error,
      });
    }
  },
);

//List a users followers
router.get(
  '/api/user/:username/followers/:id?',
  async (req: Request, res: Response) => {
    try {
      if (!req.params.id) {
        const data = await getFollowers(req.params.username);
        console.log(data, 'data');
        res.status(200).send(data);
      } else {
        const followers = await getOneFollower(req.params.id);
        res.status(200).send(followers);
      }
    } catch (error) {
      res.status(500).send({
        message: 'Internal server error',
        error: error,
      });
    }
  },
);

//Add a follower
router.post(
  '/api/user/:username/followers',
  async (req: Request, res: Response) => {
    console.log(req.body);
    const {
      username,
      followerName,
      followerUsername,
      followerAvatar,
      followerTagline,
    } = req.body;
    try {
      const follower = await newFollower({
        username,
        followerName,
        followerUsername,
        followerAvatar,
        followerTagline,
      });
      console.log('result', follower);
      res.status(201).send({ success: true, follower });
    } catch (error) {
      res.status(404).send({
        message: 'Failed to update user followers',
        error,
      });
    }
  },
);

//Delete a follower
router.delete(
  '/api/user/:username/followers/:id',
  async (req: Request, res: Response) => {
    try {
      await Follower.findOneAndRemove({ _id: req.params.id });
      // await Follower.remove()
      res.status(200).send({
        success: true,
        message: 'Removed follower',
      });
    } catch (error) {
      res.status(404).send({
        success: false,
        message: 'Follower not found',
        error,
      });
    }
  },
);

export { router as flockRouter };
