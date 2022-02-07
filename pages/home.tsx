import { NextPage } from 'next';
import { useEffect, MouseEvent, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Friend from '../components/friend';

export type UserInfo = {
  uid: number;
  displayName: string;
  photo: string;
};

const Home: NextPage = () => {
  let myProfile: UserInfo = {
    uid: 1,
    displayName: 'None',
    photo: 'None',
  };
  const [friendList, setFriendList] = useState<number[]>([2, 3]);

  useEffect(() => {

  }, []);

  return (
    <Layout>
      <p>
        <img
          src={myProfile.photo}
          alt={'프로필 사진'}
          width={100}
          height={100}
          className={'p-10'}
        />
        {myProfile.displayName}
        <button type={'button'}>메시지 보내기</button>
      </p>
    </Layout>
  );
};

export default Home;
