import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
} from 'react-google-login';
import { useRouter } from 'next/router';

import { getCookie, setCookie } from '../components/cookie';
import axios from 'axios';

const Login = () => {
  const router = useRouter();

  const responseGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ('getId' in response) {
      const { profileObj } = response;
      const existsRes = await axios.get(
        `${process.env.NEXT_PUBLIC_PREFIX_DEV}/user/getUserByEmail/${profileObj.email}`
      );

      if (existsRes.data === '') {
        const dateRes = await axios.get(
          `${process.env.NEXT_PUBLIC_PREFIX_DEV}/serverDateTime`
        );

        await axios.post(
          `${process.env.NEXT_PUBLIC_PREFIX_DEV}/user/createUser`,
          {
            displayUserName: profileObj.name,
            email: profileObj.email,
            signDate: dateRes.data,
          }
        );
      } else {
        const expires = new Date();
        expires.setDate(response.getAuthResponse().expires_at + 10);

        setCookie('uid', existsRes.data, {
          path: '/',
          expires: expires,
        });
      }

      await router.replace('/home');
    }
  };

  const { signIn, loaded } = useGoogleLogin({
    clientId: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
    onSuccess: responseGoogle,
    onFailure: (error) => console.log(error),
    isSignedIn: false,
  });

  return <button onClick={signIn}>로그인</button>;
};

export default Login;
