import express, { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../helpers/jwtVerify';
import { getOneQuack, getQuacks, newQuack } from '../helpers/quack-helpers';
import { Quack } from '../models/quacks-model';
import { User } from '../models/user-model';

const router = express.Router();

/* List quacks
 * @requiresAuth: false
 */
router.get(
  '/api/user/:username/quacks/:id?',
  async (req: Request, res: Response) => {
    try {
      if (!req.params.id) {
        const data = await getQuacks(req.params.username);
        res.status(200).send(data);
      } else {
        const quack = await getOneQuack(req.params.id);
        res.status(200).send(quack);
      }
    } catch (error) {
      res.status(500).send({
        message: 'Error retreiving quack data',
        error,
      });
    }
  },
);

/* List quacks focused at a user
 * @requiresAuth: false
 */
router.get(
  '/api/focused/:username/quacks/',
  async (req: Request, res: Response) => {
    try {
      const focused = await Quack.find({ atUsers: req.params.username })
        .populate('avatar')
        .sort({ quackedAt: -1 });
      res.status(200).send(focused);
    } catch (error) {
      res.status(500).send({
        message: 'Error retreiving quack data',
        error,
      });
    }
  },
);

/* Add a new quack
 * @requiresAuth: true
 */
router.post(
  '/api/user/:username/quacks',
  async (req: Request, res: Response) => {
    //Check jwt token
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).send({
        message: 'No token provided.',
      });
    }
    let author = '';
    try {
      const payload = verifyToken(token) as JwtPayload;
      if (payload.username !== req.params.username) {
        return res.status(401).send({
          message: 'Token invalid.',
        });
      }
      author = payload.username;
    } catch (error) {
      return res.status(401).send({
        message: 'Token invalid.',
      });
    }
    const { name, content, avatar, userId, atUsers } = req.body;
    try {
      const quack = await newQuack({
        userId,
        name,
        username: author,
        content,
        avatar,
        atUsers,
      });
      await User.findOneAndUpdate(
        { username: author },
        { $inc: { quacks: 1 } },
        { returnDocument: 'after' },
      );
      res.status(201).send({ success: true, quack });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Quack could not be created',
        error,
      });
    }
  },
);

/* Like or un-like a quack
 * @requiresAuth: true
 */
router.patch(
  '/api/user/:username/quacks/:id',
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
      if (payload.username !== req.body.likedUsername) {
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
      if (req.body.liked) {
        await Quack.findOneAndUpdate(
          { _id: req.params.id },
          { $addToSet: { likes: req.body.likedUsername } },
          { returnDocument: 'after' },
        );
        await User.findOneAndUpdate(
          { username: req.body.likedUsername },
          { $addToSet: { likedQuacks: req.params.id } },
          { returnDocument: 'after' },
        );
        res.status(200).send({
          success: true,
          message: 'Quack liked',
        });
      } else {
        await Quack.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { likes: req.body.likedUsername } },
          { returnDocument: 'after' },
        );
        await User.findOneAndUpdate(
          { username: req.body.likedUsername },
          { $pull: { likedQuacks: req.params.id } },
          { returnDocument: 'after' },
        );
        res.status(200).send({
          success: true,
          message: 'Quack un-liked',
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Failed to update quack status',
        error,
      });
    }
  },
);

/* Delete a quack
 * @requiresAuth: true (future)
 */
router.delete(
  '/api/user/:username/quacks/:id',
  async (req: Request, res: Response) => {
    try {
      await User.updateMany(
        { likedQuacks: req.params.id },
        { $pull: { likedQuacks: req.params.id } },
        { returnDocument: 'after' },
      );
      await Quack.findOneAndRemove({ _id: req.params.id });
      await User.findOneAndUpdate(
        { username: req.params.username },
        { $inc: { quacks: -1 } },
        { returnDocument: 'after' },
      );
      res.status(200).send({
        success: true,
        message: 'Quack successfully deleted',
      });
    } catch (error) {
      res.status(404).send({
        success: false,
        message: 'Quack not found',
        error,
      });
    }
  },
);

export { router as quackRouter };
