import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin
} from 'react-google-login';
import { useRouter } from 'next/router';
import { setCookie } from '../components/cookie';
import { createUser, getServerDateTime, getUserIdByEmail } from '../lib/utils';

const Login = () => {
  const router = useRouter();

  const responseGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ('getId' in response) {
      const { profileObj } = response;
      let uid = await getUserIdByEmail(profileObj.email);

      if (uid === undefined) {
        const date = await getServerDateTime();

        uid = await createUser(profileObj.name, profileObj.email, date);
      }

      const expires = new Date();
      expires.setDate(response.getAuthResponse().expires_at + 10);

      setCookie('uid', uid, {
        path: '/',
        expires: expires
      });

      await router.replace({
        pathname: '/home',
        query: {
          uid: uid
        }
      });
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
