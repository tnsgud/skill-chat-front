import { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from '../components/cookie';

const Index: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const uid = getCookie('uid');

    if (uid === undefined) {
      router.replace({ pathname: '/login' });
    } else {
      router.replace({
        pathname: '/home',
        query: { uid: uid }
      });
    }
  }, []);

  return (
    <h1>initializing</h1>
  );
};

export default Index;
