import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { findOneUser, User } from '../models/user-model';
import { IUser } from '../types/user-schema';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const jwtSecret = process.env.JWT_SECRET_KEY;

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
  let hashedPassword = '';

  await bcrypt.hash(req.body.password, 10).then((hash) => {
    hashedPassword = hash;
  });

  const user = User.build({
    displayPic: '',
    name: req.body.name,
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
    dateOfBirth: new Date(),
    createdAt: new Date(),
    tagline: '',
    quacks: 0,
    reQuacks: 0,
  });

  await user
    .save()
    .then((u) => res.status(201).send(u))
    .catch((e) => {
      return res.status(503).send({
        message: 'Invalid name or username',
        error: e,
      });
    });
});

//Login
router.post('/api/user/login', async (req, res) => {
  const { username, password } = req.body;

  console.log(req.headers);

  const user = await User.findOne({ username: username });
  if (user) {
    const match = await bcrypt.compare(password, user.password as string);
    if (match) {
      const token = jwt.sign(req.body, jwtSecret as string, {
        expiresIn: 3600,
      });
      res.status(200).send({
        success: true,
        message: 'Successfully logged in',
        token,
      });
      return;
    }
  }
  res.status(401).send({
    message: 'Password incorrect',
  });
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
