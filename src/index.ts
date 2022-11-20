import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { json } from 'body-parser';
import { quackRouter } from './routes/quacks';
import { userRouter } from './routes/user';
import { createLog } from './middleware/log';
import { flockRouter } from './routes/flock';

const port = 3001;
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

//MIDDLEWARE
app.use(json());
app.use(createLog);
//Adds security headers
app.use(helmet());

app.use(userRouter);
app.use(quackRouter);
app.use(flockRouter);

try {
  mongoose.connect('mongodb://localhost:27017/quackle');
  console.log('connected to database');
} catch (e) {
  console.error('error connecting to database', e);
}

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
