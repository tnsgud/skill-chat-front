import { NextPage } from 'next';
import Layout from '../components/Layout';
import { useEffect, MouseEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface ChattingRoomData {
  roomId: number;
  users: number[];
  displayRoomName: string;
}

const userName = ['', '박순형', '김찬웅', '원종인'];

const ChattingRoomList: NextPage = () => {
  const currentUserId = 1;
  const router = useRouter();

  const [chatList, setChatList] = useState<number[]>([]);

  useEffect(() => {
    const getChatList = async () => {
      const response = await axios.get(`${process.env.NExt_PUBLIC_PREFIX_DEV}/user/getChatList/${router.query.currentUserId}`)
    }

    getChatList()
  }, []);

  const onClick = (e: MouseEvent<HTMLParagraphElement>) => {
    router.push({pathname:'/chattingRoom', query:{id:e.currentTarget.id}})
  };

  return (
    <Layout>
      {chatList.map(async (id) => {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_HOST}/chatting/getChattingRoomData/${id}`
        );
        const { data } = response;
        const chatInfo: ChattingRoomData = {
          roomId: id,
          displayRoomName: data.displayRoomName,
          users: data.users,
        };

        return (
          <p key={chatInfo.roomId} onClick={onClick} id={`${chatInfo.roomId}`}>
            {chatInfo.displayRoomName} -
            {chatInfo.users
              .filter((value) => value !== currentUserId)
              .map((value, index, array) => {
                if (value !== currentUserId) {
                  // const response = await axios.get(
                  //   `${process.env.NEXT_PUBLIC_BACK_HOST}/user/getUserName/${value}`
                  // );
                  // let name: string = response.data.displayUserName;

                  let name = userName[value];

                  if (index < array.length - 1 && array.length > 1) {
                    name += ', ';
                  }

                  return <a key={name}>{name}</a>;
                }
              })}
            <br />
            hello world!
          </p>
        );
      })}
    </Layout>
  );
};

export default ChattingRoomList;
