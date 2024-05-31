import axios from 'axios';
import {
  GithubTokensResult,
  GithubUserResult,
  GoogleTokensResult,
  GoogleUserResult,
} from './types/oauth-service';
import { URLSearchParams } from 'url';

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

export async function GetGoogleOAuthToken({ code }: { code: string }) {
  const url = 'https://oauth2.googleapis.com/token';

  const params = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
    redirect_uri: process.env.GOOGLE_OAUTH_URI as string,
    grant_type: 'authorization_code',
  };

  const qs = new URLSearchParams(params);

  try {
    const res = await axios.post<GoogleTokensResult>(url, qs.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function GetGoogleUser({
  access_token,
  id_token,
}: {
  access_token: string;
  id_token: string;
}):Promise<GoogleUserResult> {
  try {
    const res = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );

    return res.data;
  } catch (error: any) {
    throw new Error(`Failed to get Google user: ${error.message}`);
  }
}
