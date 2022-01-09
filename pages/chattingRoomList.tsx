import { NextPage } from 'next';
import Layout from '../components/Layout';
import { useEffect, MouseEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface ChattingRoomId {
  roomId: number;
  users: number[];
  displayRoomName: string;
}

const userName = ['', '박순형', '김찬웅', '원종인'];

const ChattingRoomList: NextPage = () => {
  const currentUserId = 1;
  const router = useRouter();
  // test data
  const chattingRooms: ChattingRoomId[] = [
    { roomId: 1, displayRoomName: 'test chatting room(1,2)', users: [1, 2] },
    { roomId: 2, displayRoomName: 'test chatting room(1,3)', users: [1, 3] },
    { roomId: 3, displayRoomName: 'test chatting room(2,3)', users: [2, 3] },
    {
      roomId: 4,
      displayRoomName: 'test chatting room(1,2,3)',
      users: [1, 2, 3],
    },
  ];

  // test data
  let chatList: number[] = [1, 2, 4];

  useEffect(() => {
    // axios를 이용하여 user chat list 가져오기
    // async function getChatList() {
    //   const response = await axios.get('')
    //   chatList = response.data.chatlist
    // }
    // getChatList()
    //test data
  }, []);

  const onClick = (e: MouseEvent<HTMLParagraphElement>) => {
    router.push({pathname:'/chattingRoom', query:{id:e.currentTarget.id}})
  };

  return (
    <Layout>
      {chatList.map((id) => {
        // const response = await axios.get(
        //   `${process.env.NEXT_PUBLIC_BACK_HOST}/chatting/getChattingRoomData/${id}`
        // );
        // const { data } = response;
        // const chatInfo: ChattingRoomId = {
        //   roomId: id,
        //   displayRoomName: data.displayRoomName,
        //   users: data.users,
        // };
        const chatInfo: ChattingRoomId = {
          roomId: id,
          displayRoomName: `test room ${id}`,
          users: chattingRooms.filter((value) => value.roomId === id)[0].users,
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
