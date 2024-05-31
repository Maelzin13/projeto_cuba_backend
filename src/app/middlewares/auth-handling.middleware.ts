import { NextFunction, Request, Response } from 'express';
import { OAuthGithub } from '../controllers/oauth/oauth-github/oauth-github.controller';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { UserDocument } from '../../@types/user';
import { OAuthGoogle } from '../controllers/oauth/oauth-google/oauth-google.controller';
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
    jwt.verify(token, secret, (err: VerifyErrors | null, decoded:any) => {
      if (err) {
        return res.status(401).json({ message: 'Login expired' });
      }
      return console.log('User:', decoded.user);
    });
    return;
  }

  const { provider,code } = req.query;

  try {
    if (provider === 'google') {
      return await OAuthGoogle(req, res);
    }
    if (provider === 'github') {
      return await OAuthGithub(req, res);
    }
    if (provider === 'credentials') {
    }

    throw new Error('Invalid Provider');

  } catch (error: any) {
    console.error(error.message);
    return res.status(401).json({ msg: error.message });
  }
};

export { AuthHandling };
