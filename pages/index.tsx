import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Layout from '../components/Layout';
import { getCookie } from '../components/cookie';
import axios from 'axios';

const Index: NextPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false );

  useEffect(() => {
    const cookie = getCookie('idToken')

    if (cookie === undefined) {
      router.replace('/login')
    }else {
      router.replace('/home')
    }
  }, []);

  return (
    <Layout >
      <h1>initializing</h1>
    </Layout>
  );
};

export default Index;
