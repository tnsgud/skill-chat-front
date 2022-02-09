import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Friend from '../components/friend';

export type UserInfo = {
  uid: string;
  displayName: string;
  photo: string;
};

const Home: NextPage = () => {
  const [friendList, setFriendList] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    uid: '',
    displayName: '',
    photo: '',
  });

  const homeInit = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PREFIX_DEV}/user/getAllUserInfo/갔겅땠뒹텬될냠뀔똑챵췌러`
    );

    const { data } = res;

    setFriendList(data.friendList);
    setUserInfo({
      uid: data.uid,
      displayName: data.displayUserName,
      photo: data.photo,
    });
  };

  useEffect(() => {
    homeInit();
  }, []);

  return (
    <div className='divide-y m-5'>
      <p className='flex flex-row items-center justify-start text-2xl mb-5'>
        <img
          className='rounded-2xl w-36 h-36 mx-5'
          src={
            userInfo.photo === null
              ? 'https://w.namu.la/s/40de86374ddd74756b31d4694a7434ee9398baa51fa5ae72d28f2eeeafdadf0c475c55c58e29a684920e0d6a42602b339f8aaf6d19764b04405a0f8bee7f598d2922db9475579419aac4635d0a71fdb8a4b2343cb550e6ed93e13c1a05cede75'
              : userInfo.photo
          }
          alt='profile'
        />
        {userInfo.displayName}
      </p>

      <div className='text-2xl mx-5'>
        <div className='pl-3'>My friends</div>
        {friendList.map((e) => {
          return <Friend key={e} uid={e} />;
        })}
      </div>
      
      
    </div>
  );
};

export default Home;
