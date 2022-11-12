import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { json } from 'body-parser';
import { quackRouter } from './routes/quacks';
import { userRouter } from './routes/user';
import { createLog } from './middleware/log';

const port = 3001;
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

//MIDDLEWARE
app.use(json());
app.use(createLog);
//Adds security headers
app.use(helmet());

app.use(quackRouter);
app.use(userRouter);

mongoose.connect('mongodb://localhost:27017/quackle', () => {
  console.log('connected to the database');
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
