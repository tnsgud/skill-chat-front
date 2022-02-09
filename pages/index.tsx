import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from '../components/cookie';

const Index: NextPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false );

  useEffect(() => {
    const cookie = getCookie('idToken');

    if (cookie === undefined) {
      router.replace('/login')
    }else {
      router.replace('/home')
    }
  }, []);

  return (
    <h1>initializing</h1>
  );
};

export default Index;
