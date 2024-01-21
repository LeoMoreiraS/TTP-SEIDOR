import { type Response } from 'express';

export function errorHandler (error: Error | string | unknown, res: Response, status = 400): Response {
  if (typeof error === 'string') return res.status(status).json({ error: { message: error } });
  return res.status(status).json({ error: { message: 'Something unexpected happened' } });
}
