import { MediaEnum } from '../interfaces/Media.interface';
import { Movie, TvShow } from "../generated/graphql";
export async function getRequestToken(): Promise<any> {
  const urlToken = import.meta.env.VITE_API_DEFAULT + '/authentication/token/new?api_key=' + import.meta.env.VITE_API_KEY;

  return callUrl(urlToken).then((res) => {
    return res.request_token;
  });
}

export async function getUser(requestToken: any): Promise<any> {
  const urlSession = import.meta.env.VITE_BACK_URL + '/user/create';

  console.info('verif', requestToken)
  const res = await callUrl(urlSession, {
    method: 'POST',
    body: JSON.stringify({ request_token: requestToken }),
    headers: { 'Content-type': 'application/json' },
  });

  console.info('getUserRes', res)
  return res;
}

export async function callUrl(url: string, options?: any): Promise<any> {
  try {
    const res: any = await fetch(url, options);
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
}
