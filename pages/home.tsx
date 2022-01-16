import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

interface UserInfo {
  displayName: string | string[] | undefined;
  photo: string;
}

const Home: NextPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    displayName: 'init name',
    photo: '',
  });
  const [friendList, setFriendList] = useState<number[]>([]);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PREFIX_DEV}/user/getName/testUser`
      );

      setUserInfo({
        displayName: response.data.displayUserName,
        photo:
          'https://file.mk.co.kr/meet/neds/2021/12/image_readtop_2021_1128388_16391105484879287.jpg',
      });
    };

    const getFriendList = async () => {
      const response = await axios.get(
        `${process.env.NExt_PUBLIC_PREFIX_DEV}/user/getFriendList/testUser`
      );
      setFriendList(response.data.firendList);
    };

    getUserInfo();
    getFriendList();
  }, []);

  return (
    <Layout>
      <p>
        <img
          src={userInfo.photo}
          alt={'user profile photo '}
          width={100}
          height={100}
        />
        {userInfo.displayName}
        <button type={'button'}>메시지 보내기</button>
      </p>

      {friendList.map( async (item) => {
        const nameResponse = await axios.get(`${process.env.NExt_PUBLIC_PREFIX_DEV}/user/getName/${item}`)
        const photoResponse = await axios.get(`${process.env.NExt_PUBLIC_PREFIX_DEV}/user/getProfilePhoto/${item}`)

        return (
          <p key={item}>
            <img
              src={photoResponse.data.photo}
              alt={'user profile photo'}
              width={100}
              height={100}
            />
            {nameResponse.data.displayUserName}
            <button type={'button'}>메시지 보내기</button>
          </p>
        );
      })}
    </Layout>
  );

  // return (
  //   <>
  //     <form onSubmit={onSubmit}>
  //       <div>
  //         <input type={'text'} /> <input type={'submit'} />
  //       </div>
  //     </form>
  //   </>
  // );
};

export default Home;
