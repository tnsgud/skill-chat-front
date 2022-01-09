import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import axios from 'axios';
import Layout from '../components/Layout';

const Index: NextPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const checkLogin = async () => {
    // const response = await axios.get(
    //   `${process.env.NEXT_PUBLIC_PREFIX_DEV}/user/getName/testuser`
    // );

    await router.replace({
      pathname: isLogin ? '/home' : '/login',
      query: isLogin
        ? { displayName: 'tnsgud', isLogin: isLogin } //{ response.data.displayUserName }
        : { isLogin },
    });
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <Layout >
      <h1>initializing</h1>
    </Layout>
  );
};

export default Index;
