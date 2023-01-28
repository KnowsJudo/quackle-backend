import jwt from 'jsonwebtoken';
import { jwtSecret } from '..';

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtSecret as string);
};
