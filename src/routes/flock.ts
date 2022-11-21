import express, { Request, Response } from 'express';
import { getFollowing, getOneFollowing } from '../helpers/flock-helpers';

const router = express.Router();

//List following users
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
