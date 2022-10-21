import mongoose from 'mongoose';
import { ITodo, ITodoModel } from '../types/schema';

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: {
    type: String,
    required: true,
  },
});

todoSchema.statics.build = (item: ITodo) => {
  return new Todo(item);
};

const Todo = mongoose.model<any, ITodoModel>('Todo', todoSchema);

export { Todo };
