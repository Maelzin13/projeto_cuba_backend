import axios from 'axios';
import { GithubTokensResult, GithubUserResult } from './types/oauth-service';

export async function GetGithubOAuthTokens({
  code,
}: {
  code: string;
}): Promise<string> {
  try {
    const res: GithubTokensResult = (await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID as string,
        client_secret: process.env.GITHUB_CLIENT_SECRET as string,
        code: code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )) as GithubTokensResult;

    return res.data.access_token;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function GetGithubUser({
  accessToken,
}: {
  accessToken: string;
}): Promise<GithubUserResult> {
  const url = 'https://api.github.com/user';

  try {
    
    const res = await axios.get<GithubUserResult>(url, {
      headers: {
        Authorization: `token ${accessToken}`,
        'User-Agent': 'node.js',
      },
    });
    
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
