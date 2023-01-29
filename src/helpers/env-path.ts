import * as dotenv from 'dotenv';
import path from 'path';

const setEnv = () => {
  try {
    dotenv.config({
      path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
    });
  } catch (error) {
    console.log('Could not load env variables');
  }
};

export default setEnv;
