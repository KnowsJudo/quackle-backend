import { Request, Response } from 'express';

export const createLog = (req: Request, res: Response, next: () => void) => {
  res.on('finish', () => {
    const requestSize = Buffer.byteLength(JSON.stringify(req.body), 'utf8');
    console.log(
      `Request body size: ${requestSize} bytes`,
      req.method,
      decodeURI(req.url),
      res.statusCode,
      res.statusMessage,
    );
  });
  next();
};
