import express, { Request, Response } from 'express';
import { findOneUser, User } from '../models/user-model';

const router = express.Router();

// Search db for first all users, then specific user by username
router.get('/api/user/:username?', async (req: Request, res: Response) => {
  if (!req.params.username) {
    await User.find()
      .limit(20)
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
    const user = await findOneUser(req.params.username);
    if (!user) {
      return res.status(404).send({
        error: 'User does not exist',
      });
    }
    return res.send(user);
  }
});

// Add user to db
router.post('/api/user', async (req: Request, res: Response) => {
  const user = User.build({
    displayPic: '',
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    dateOfBirth: new Date(),
    createdAt: new Date(),
  });
  try {
    await user.save();
    return res.status(201).send(user);
  } catch (error) {
    return res.status(404).send({
      message: 'User already exists',
      error: error,
    });
  }
});

router.delete('/api/user/:username', async (req: Request, res: Response) => {
  const user = await findOneUser(req.params.username);
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
