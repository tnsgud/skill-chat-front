import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from '../components/cookie';

const ChattingRoomList = () => {
  const [chatList, setChatList] = useState([]);

  const getIdToken = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PREFIX_DEV}/user/getChatList/${getCookie(
        'uid'
      )}`
    );
    const { chatList } = res.data;

    if (chatList === null) {
      console.log('친구 없는 찐따가 뭔 채팅이야 ㅋㅋ');
    } else {
      console.log('찐따 주제 친구랑 카톡도 함? ㅋㅋㅋㅋ');
    }
  };

  useEffect(() => {
    getIdToken();
  }, []);

  return <div>this is chatting room list page</div>;
};

export default ChattingRoomList;
