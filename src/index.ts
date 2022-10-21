import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { json } from 'body-parser';
import { quackRouter } from './routes/quacks';
import { userRouter } from './routes/user';
import { createLog } from './middleware/log';

const port = 3001;
const app = express();

//MIDDLEWARE
app.use(json());
app.use(createLog);
//Adds security headers
app.use(helmet());

app.use(quackRouter);
app.use(userRouter);

mongoose.connect(
  'mongodb://localhost:27017/todo',
  // {
  //   useCreateIndex: true,
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // },
  () => {
    console.log('connected to the database');
  },
);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
