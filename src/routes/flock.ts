import express, { Request, Response } from 'express';
import { getFollowing, getOneFollowing } from '../models/flock-model';

const router = express.Router();

//List Following Users
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
      res.status(404).send({
        message: 'User is not following anyone',
        error: error,
      });
    }
  },
);

export { router as flockRouter };
