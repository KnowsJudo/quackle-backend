import express, { Request, Response } from 'express';
import { User } from '../models/user-model';

const router = express.Router();

router.get('/api/user/:id?', async (req: Request, res: Response) => {
  if (!req.params.id) {
    await User.find()
      .limit(2)
      .then((users) => {
        return res.send({
          users: users,
        });
      })
      .catch((error) =>
        res.send({
          message: 'No users found',
          error: error,
        }),
      );
  } else {
    // Filter to find only parameters
    const user = await User.findOne({
      userName: req.params.id,
    });
    if (!user) {
      return res.status(404).send({
        error: 'User does not exist',
      });
    }
    return res.send(user);
  }
});

// User
router.post('/api/user', async (req: Request, res: Response) => {
  const user = User.build({
    displayPic: '',
    name: req.body.name,
    userName: req.body.userName,
    createdAt: new Date(),
  });
  await user.save();

  return res.status(201).send(user);
});

router.delete('/api/user/:id', async (req: Request, res: Response) => {
  const user = await User.findOne({
    userName: req.params.id,
  });
  if (user) {
    user
      .deleteOne()
      .then(() => {
        return res.send({
          message: 'User successfully deleted',
        });
      })
      .catch((error: any) => {
        return res.send({
          message: 'Failed to delete user',
          error: error,
        });
      });
  } else {
    return res.send({
      message: 'User not found',
    });
  }
});

export { router as userRouter };
