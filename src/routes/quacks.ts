import express, { Request, Response } from 'express';
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
      res.status(404).send({
        message: 'Quack does not exist',
        error,
      });
    }
  },
);

//Add new quack
router.post(
  '/api/user/:username/quacks',
  async (req: Request, res: Response) => {
    const { name, username, message, user, atUser } = req.body;
    try {
      const quack = await newQuack({ name, username, message, user, atUser });
      await User.findOneAndUpdate(
        { username },
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
      res.status(404).send({
        success: false,
        message: 'Failed to update quack status',
        error,
      });
    }
  },
);

//Delete a quack
router.delete(
  '/api/user/:username/quacks/:id',
  async (req: Request, res: Response) => {
    try {
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
