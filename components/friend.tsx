import axios from 'axios';
import { useEffect, useState } from 'react';
import { UserInfo } from '../pages/home';

const Friend = ({ uid }: { uid: string }) => {
  const [info, setInfo] = useState<UserInfo>({
    uid: '',
    photo: '',
    displayName: '',
  });

  const getInfo = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PREFIX_DEV}/user/getAllUserInfo/${uid}`
    );
    const { data } = res;

    setInfo({ uid: uid, displayName: data.displayUserName, photo: data.photo });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className='flex flex-row items-center text-2xl hover:bg-blue-50'>
      <img className='w-32 h-32 rounded-2xl m-3'
        src={
          info.photo === null
            ? 'https://w.namu.la/s/40de86374ddd74756b31d4694a7434ee9398baa51fa5ae72d28f2eeeafdadf0c475c55c58e29a684920e0d6a42602b339f8aaf6d19764b04405a0f8bee7f598d2922db9475579419aac4635d0a71fdb8a4b2343cb550e6ed93e13c1a05cede75'
            : info.photo
        }
        alt='profile'
      />
      <div>{info.displayName}</div>
    </div>
  );
};

export default Friend;
