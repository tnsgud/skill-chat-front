import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin
} from 'react-google-login';
import { useRouter } from 'next/router';

import { getCookie, setCookie } from '../components/cookie';
import axios from 'axios';
import { getServerDateTime, getUserIdByEmail } from '../lib/utils';

const Login = () => {
  const router = useRouter();

  const responseGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ('getId' in response) {
      const { profileObj } = response;
      let uid = await getUserIdByEmail(profileObj.email);

      if (uid === '') {
        const date = getServerDateTime();

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/user/createUser`,
          {
            displayUserName: profileObj.name,
            email: profileObj.email,
            signDate: date
          },
          {
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          }
        );

        if (res.status === 201) {
          uid = res.data.uid;
          const expires = new Date();
          expires.setDate(response.getAuthResponse().expires_at + 10);

          setCookie('uid', uid, {
            path: '/',
            expires: expires
          });

          await router.replace({
            pathname: '/home',
            query: {
              uid: getCookie('uid')
            }
          });
        }
      } else {
        const expires = new Date();
        expires.setDate(response.getAuthResponse().expires_at + 10);

        setCookie('uid', uid, {
          path: '/',
          expires: expires
        });

        await router.replace({
          pathname: '/home',
          query: {
            uid: getCookie('uid')
          }
        });
      }
    }
  };

  const { signIn } = useGoogleLogin({
    clientId: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
    onSuccess: responseGoogle,
    onFailure: (error) => console.log(error),
    isSignedIn: false
  });

  return <button onClick={signIn}>로그인</button>;
};

export default Login;
