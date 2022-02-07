import { NextPage } from 'next';
import  {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin
} from 'react-google-login';

import Layout from '../components/Layout';
import {  useRouter } from 'next/router';

import {  setCookie } from '../components/cookie';

const Login: NextPage = () => {
  const router = useRouter();

  const responseGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ('getId' in response) {
      const expires = new Date()
      expires.setDate(expires.getDay()+1)

      setCookie('idToken', response.getAuthResponse().id_token, {
        path: '/',
        expires:expires
      });
    }
    await router.replace('/home');
  };

  const { signIn, loaded } = useGoogleLogin({
    clientId: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
    onSuccess: responseGoogle,
    onFailure: (error) => console.log(error),
    isSignedIn: false
  });

  return (
    <Layout>
      <button onClick={signIn}>로그인</button>
    </Layout>
  );
};

export default Login;
