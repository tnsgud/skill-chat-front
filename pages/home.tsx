import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

interface UserInfo {
  displayName: string;
  photo: string;
}

const userInfo: UserInfo = {
  displayName: '박순형',
  photo: 'http://img.khan.co.kr/news/2020/10/16/2020101601001687000138341.jpg',
};

const userInfos: UserInfo[] = [
  {
    displayName: '김찬웅',
    photo:
      'http://img.khan.co.kr/news/2020/10/16/2020101601001687000138341.jpg',
  },
  {
    displayName: '원종인',
    photo:
      'http://img.khan.co.kr/news/2020/10/16/2020101601001687000138341.jpg',
  },
  {
    displayName: '하태웅',
    photo:
      'http://img.khan.co.kr/news/2020/10/16/2020101601001687000138341.jpg',
  },
];

const Home: NextPage = () => {
  // const [userInfo, setUserInfo] = useState<UserInfo>({
  //   displayName: '',
  //   photo: '',
  // });
  // const name = useRouter().query.displayName;
  //
  // const getUserInfo = async () => {
  //   const info: UserInfo = {
  //     displayName: name as string,
  //     photo:
  //       'http://img.khan.co.kr/news/2020/10/16/2020101601001687000138341.jpg',
  //   };
  //   setUserInfo(info);
  // };
  //
  // useEffect(() => {
  //   getUserInfo();
  // }, []);

  return (
    <Layout>
      <p>
        <img
          src={userInfo.photo}
          alt={'user profile photo'}
          width={100}
          height={100}
        />
        {userInfo.displayName}
        <button type={'button'}>메시지 보내기</button>
      </p>

      {userInfos.map((item) => {
        return (
          <p key={item.displayName}>
            <img
              src={item.photo}
              alt={'user profile photo'}
              width={100}
              height={100}
            />
            {item.displayName}
            <button type={'button'}>메시지 보내기</button>
          </p>
        );
      })}
      {/*{userInfo.friendList.map(async (id) => {*/}
      {/*  //axios get name을 이용해서 이름을 보내줌*/}
      {/*  // const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_HOST}/user/getName/${id}`)*/}
      {/*  // const name = response.data*/}

      {/*  const name = '박순형';*/}
      {/*  return <h1 key={id}>{id}</h1>*/}
      {/*  // return <FriendInfo key={id} displayName={name} photo={'picture'}/>*/}
      {/*  // return <FriendInfo key={id}/>*/}
      {/*})}*/}
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
