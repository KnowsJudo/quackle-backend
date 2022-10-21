import express, { Request, Response } from 'express';
import { Todo } from '../models/todo-model';

const router = express.Router();

router.get('/api/todo', [], async (req: Request, res: Response) => {
  // Filter to find only parameters
  const todo = await Todo.find({
    title: 'shanefat',
  });
  return res.send(todo);
});

// Tweet
router.post('/api/todo', async (req: Request, res: Response) => {
  const { title, description } = req.body;

  const todo = Todo.build({
    title: 'pikachu',
    description: 'yallah',
  });
  await todo.save();

  return res.status(201).send(todo);
});

export { router as todoRouter };
