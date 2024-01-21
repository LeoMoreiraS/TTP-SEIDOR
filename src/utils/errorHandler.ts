import { ApplicationError } from './ApplicationError';

export function errorHandler (error: Error | unknown, status = 400): void {
  if (error instanceof Error) throw new ApplicationError(error.message, status);
  throw new ApplicationError('Something unexpected happened');
}
