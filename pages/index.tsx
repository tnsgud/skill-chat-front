import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import axios from 'axios';
import Layout from '../components/Layout';

const Index: NextPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false );

  useEffect(() => {
    router.replace({pathname:isLogin ? '/home' : '/login',query:{isLogin:isLogin}}).then(r => console.log(r));
  }, []);

  return (
    <Layout >
      <h1>initializing</h1>
    </Layout>
  );
};

export default Index;
