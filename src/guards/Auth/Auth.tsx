import React, { useEffect, useState } from 'react';
import { getRequestToken, getUser } from '../../helpers/MediaApiCalls';
import { Navigate } from "react-router-dom"
const Login = async (): Promise<any> => {
  console.info('logddsqin');
  console.info('import', import.meta.env.VITE_API_KEY)
  return getRequestToken().then((token) => {
    console.info('request_token', token)
    window.location.replace(
      'https://www.themoviedb.org/authenticate/' + token + '?redirect_to=' + import.meta.env.VITE_FRONT_URL + '/auth/session',
    );
  });
};

const Session = () => {
  //get query string params
  const queryParameters = new URLSearchParams(window.location.search)
  console.info('queryParams', queryParameters)

  const requestToken = queryParameters.get('request_token')
  console.info('requestToken', requestToken)
  const isApproved = queryParameters.get('approved')

  const [user, setUser] = useState({ username: null });
  useEffect(() => {
    async function getUserInfos() {
      console.info('getUserInfos')
      const userData = await getUser(requestToken);
      await localStorage.setItem('user', JSON.stringify(userData));
      await setUser(userData);
    }

    getUserInfos().then();
  }, []);

  if (user.username) {
    return <Navigate replace to="/" />;
  } else {
    return <div style={{ color: 'white' }}>loading</div>;
  }

  //call backend
};
export { Login, Session };
