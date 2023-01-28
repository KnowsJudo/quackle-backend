import express, { Request, Response } from 'express';
import {
  getFollowers,
  getFollowing,
  getOneFollower,
  getOneFollowing,
  newFollower,
  newFollowing,
} from '../helpers/flock-helpers';
import { verifyToken } from '../helpers/jwtVerify';
import { Follower, Following } from '../models/flock-model';
import { User } from '../models/user-model';
import { JwtPayload } from 'jsonwebtoken';

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

/* Add a following user
 * @requiresAuth: true
 */
router.post(
  '/api/user/:username/following',
  async (req: Request, res: Response) => {
    //Check jwt token
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).send({
        message: 'No token provided.',
      });
    }
    try {
      const payload = verifyToken(token) as JwtPayload;
      if (payload.username !== req.params.username) {
        return res.status(401).send({
          message: 'Token invalid.',
        });
      }
    } catch (error) {
      return res.status(401).send({
        message: 'Token invalid.',
      });
    }
    if (
      (
        await User.find({
          $and: [
            { username: req.params.username },
            { following: req.body.followingUsername },
          ],
        })
      ).length
    ) {
      res.status(404).send({
        message: 'Aleady following user!',
      });
      return;
    }
    try {
      await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { following: req.body.followingUsername } },
        { returnDocument: 'after' },
      );
      const following = await newFollowing(req.body);
      res.status(201).send({ success: true, following });
    } catch (error) {
      res.status(404).send({
        message: 'Failed to update user following users',
        error,
      });
    }
  },
);

/* Add a follower
 * @requiresAuth: true
 */
router.post(
  '/api/user/:username/followers',
  async (req: Request, res: Response) => {
    //Check jwt token
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).send({
        message: 'No token provided.',
      });
    }
    try {
      const payload = verifyToken(token) as JwtPayload;
      if (payload.username !== req.body.followerUsername) {
        return res.status(401).send({
          message: 'Token invalid.',
        });
      }
    } catch (error) {
      return res.status(401).send({
        message: 'Token invalid.',
      });
    }
    try {
      await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { followers: req.body.followerUsername } },
        { returnDocument: 'after' },
      );
      const follower = await newFollower(req.body);
      res.status(201).send({ success: true, follower });
    } catch (error) {
      res.status(404).send({
        message: 'Failed to update user followers',
        error,
      });
    }
  },
);

//Delete a users following user
router.delete(
  '/api/user/:username/following/:following',
  async (req: Request, res: Response) => {
    try {
      await Following.findOneAndRemove({
        followingUsername: req.params.following,
      });
      await User.findOneAndUpdate(
        { username: req.params.username },
        { $pull: { following: req.params.following } },
        { returnDocument: 'after' },
      );
      res.status(200).send({
        success: true,
        message: 'Removed following user',
      });
    } catch (error) {
      res.status(404).send({
        success: false,
        message: 'Following user not found',
        error,
      });
    }
  },
);

//Delete a follower
router.delete(
  '/api/user/:username/followers/:follower',
  async (req: Request, res: Response) => {
    try {
      await User.findOneAndUpdate(
        { username: req.params.username },
        { $pull: { followers: req.params.follower } },
        { returnDocument: 'after' },
      );
      await Follower.findOneAndRemove({
        followerUsername: req.params.follower,
      });
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
