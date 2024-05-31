import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  GetGoogleOAuthToken,
  GetGoogleUser,
} from '../../../services/oauth/oauth.service';

export const OAuthGoogle = async (req: Request, res: Response) => {
  const frontBaseUrl = process.env.FRONT_BASE_URL as string;
  const secret = process.env.SECRET_KEY as string;

  const { code } = req.query;

  if (!code) {
    throw new Error("Don't have a code");
  }

  try {
    
    const { access_token, id_token } = await GetGoogleOAuthToken({
      code: code as string,
    });

    const user = await GetGoogleUser({ access_token, id_token });

    const token = jwt.sign({ user }, secret, {
      expiresIn: '24h',
    });

    return res
      .cookie('jwt_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 24h
      })
      .redirect(frontBaseUrl || 'http://localhost:3000');

  } catch (error: any) {
     throw new Error(error.message)
  }
};
