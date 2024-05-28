import { type NextFunction, type Request, type Response } from 'express';


const ErrorHandling = (
  err: Error | '',
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  
  // Só jogar erros no console se for ambiente de desenvolvimento.
  if (process.env.NODE_ENV === 'development') {
    next(err);
  }
};

export { ErrorHandling };
