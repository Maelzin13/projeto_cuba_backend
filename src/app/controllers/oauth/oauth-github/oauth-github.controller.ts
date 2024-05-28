import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { GithubUserResult } from '../../../services/oauth/types/oauth-service';
import {
  GetGithubOAuthTokens,
  GetGithubUser,
} from '../../../services/oauth/oauth.service';

const OAuthGithub = async (req: Request, res: Response) => {
  const frontBaseUrl = process.env.FRONT_BASE_URL as string;
  const secret = process.env.SECRET_KEY as string;

  const { code } = req.query;
  if (!code) {
    throw new Error('Dont have code');
  }

  // trocar o code recebido pelo codigo de acesso
  const accessToken = await GetGithubOAuthTokens({ code: code as string });
  
  // trocar o token de acesso pelos dados do usuario
  const user: GithubUserResult | null = await GetGithubUser({ accessToken });

  /*
  -- verificar se o github_id ja existe
  
  -- verificar se o email ja existe // se o email exisitr e github_id nao existir, crie usuario sem email
  -- verificar se o username ja existe // se username existir e o github_id nao existir, crie um usuario com o username do github + numeros aleatorios no final, 
  
  -- ao final de tudo, crie um cookie httpOnly com os dados do usuario e redirecione para o frontend
  
  */

  // crio jwt com user
  const token = jwt.sign({ user }, secret, {
    expiresIn: '24h',
  });

  // retorno o cookie e redireciono o usuario para o frontend
  return res
    .cookie('jwt_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24h
    })
    .redirect(frontBaseUrl || 'http://localhost:3000');
};

export { OAuthGithub };
