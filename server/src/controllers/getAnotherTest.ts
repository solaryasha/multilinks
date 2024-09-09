import { Request, Response } from 'express';

export const getAnotherTest = (req: Request, res: Response) => {
  res.json({
    message: 'Another test route',
  });
 };