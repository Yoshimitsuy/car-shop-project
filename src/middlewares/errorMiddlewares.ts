import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import CustomErrors from '../errors/CustomErrors';

const errorHandler: ErrorRequestHandler = (
  err: Error | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues });
  }

  if (err instanceof CustomErrors) {
    const { status, message } = err as CustomErrors;

    return res.status(status).json({ error: message });
  }

  console.error(err);
  return res.status(500).end();
};

export default errorHandler;
