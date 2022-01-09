import { NextPage } from 'next';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import Layout from '../components/Layout';

const Login:NextPage = () => {
  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {};

  return (
    <Layout>
      <GoogleLogin
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
        buttonText={'Google Login'}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </Layout>
  );
};

export default Login
