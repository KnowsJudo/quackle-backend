import express, { Request, Response } from 'express';
import { getOneQuack, getQuacks, newQuack } from '../models/quacks-model';
import { IQuack } from '../types/quack-schema';

const router = express.Router();

//List Quacks
router.get(
  '/api/user/:username/quacks/:id?',
  async (req: Request, res: Response) => {
    if (!req.params.id) {
      await getQuacks(req.params.username)
        .then((quack: IQuack[]) => {
          return res.status(200).send(quack);
        })
        .catch((error) =>
          res.send({
            message: 'No quacks found',
            error: error,
          }),
        );
    } else {
      const quack = await getOneQuack(req.params.id);
      if (!quack) {
        return res.status(404).send({
          error: 'Quack does not exist',
        });
      }
      return res.send(quack);
    }
  },
);

//Add new Quack
router.post(
  '/api/user/:username/quacks',
  async (req: Request, res: Response) => {
    const { name, username, message } = req.body;
    await newQuack({ name, username, message }).then((quack: IQuack) => {
      return res.status(201).send(quack);
    });
  },
);

//Delete a quack
router.delete(
  '/api/user/:username/quacks/:id',
  async (req: Request, res: Response) => {
    const quack = await getOneQuack(req.params.id);
    if (quack) {
      quack
        .deleteOne()
        .then(() => {
          return res.send({
            message: 'Quack successfully deleted',
          });
        })
        .catch((error: any) => {
          return res.send({
            message: 'Failed to delete Quack',
            error: error,
          });
        });
    } else {
      return res.send({
        message: 'Quack not found',
      });
    }
  },
);

export { router as quackRouter };
