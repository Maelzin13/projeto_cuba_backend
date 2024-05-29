import { NextFunction, Request, Response } from 'express';
import { OAuthGithub } from '../controllers/oauth/oauth-github/oauth-github.controller';
import jwt, { VerifyErrors } from 'jsonwebtoken';
/*
api/v1/login/oauth 

api/v1/login/oauth?provider=github&code=2232323535

api/v1/login/oauth?provider=google&code=2232323535

api/v1/login/oauth?provider=credentials (header)

*/

const AuthHandling = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secret = process.env.SECRET_KEY as string;
  const token = req.cookies.jwt_token;
  if (token) {
    // validar o jwt do cookies
    jwt.verify(token, secret, (err: VerifyErrors | null, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido' });
      }
      return console.log('Usuário:', decoded.user);
    });
    return;
  }

  const { provider } = req.query;

  try {
    if (provider === 'google') {
      // return await GoogleOAuth
    }
    if (provider === 'github') {
      return await OAuthGithub(req, res);
    }
    if (provider === 'credentials') {
      // return await CredentialsOAuth
    }

    throw new Error('Invalid Provider');
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { AuthHandling };
