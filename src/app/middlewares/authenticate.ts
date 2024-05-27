import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

/*
api/v1/login/oauth 

api/v1/login/oauth?provider=github&code=2232323535

api/v1/login/oauth?provider=google&code=2232323535

api/v1/login/oauth?provider=credentials (header)

*/

const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt_token;
  if (token) {
    // validar o jwt do cookies
    next();
  }

  const { provider } = req.query;

  try {
    if (provider === 'google') {
      // return await GoogleOAuth
    }
    if (provider === 'github') {
      // return await GithubOAuth
    }
    if (provider === 'credentials') {
      // return await CredentialsOAuth
    }

    throw new Error('Invalid Provider');
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { Authenticate };
