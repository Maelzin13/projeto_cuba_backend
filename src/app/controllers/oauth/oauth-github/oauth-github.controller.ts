import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { GithubUserResult } from '../../../services/oauth/types/oauth-service';
import {
  GetGithubOAuthTokens,
  GetGithubUser,
} from '../../../services/oauth/oauth.service';
import { User } from '../../../schemas/user.schema';

const OAuthGithub = async (req: Request, res: Response) => {
  const frontBaseUrl = process.env.FRONT_BASE_URL as string;
  const secret = process.env.SECRET_KEY as string;

  const { code } = req.query;
  if (!code) {
    throw new Error('Dont have code');
  }

  try {
    const accessToken = await GetGithubOAuthTokens({ code: code as string });

    const {
      name,
      avatar_url: avatar,
      id: githubId,
    }: GithubUserResult | undefined = await GetGithubUser({
      accessToken,
    });

    const user = await User.create({ name, avatar, githubId });

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
    throw new Error(error.message);
  }
};

export { OAuthGithub };
