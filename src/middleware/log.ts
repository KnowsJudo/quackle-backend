import { Request, Response } from 'express';

export const createLog = (req: Request, res: Response, next: () => void) => {
  res.on('finish', function () {
    console.log(
      req.method,
      decodeURI(req.url),
      res.statusCode,
      res.statusMessage,
    );
  });
  next();
};
