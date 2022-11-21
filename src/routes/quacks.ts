import express, { Request, Response } from 'express';
import { getOneQuack, getQuacks, newQuack } from '../helpers/quack-helpers';
import { Quack } from '../models/quacks-model';

const router = express.Router();

//List quacks
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
    const { name, username, message } = req.body;
    try {
      const quack = await newQuack({ name, username, message });
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

//Delete a quack
router.delete(
  '/api/user/:username/quacks/:id',
  async (req: Request, res: Response) => {
    try {
      await Quack.findOneAndRemove({ _id: req.params.id });
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
