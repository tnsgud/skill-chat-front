import axios from 'axios';
import { useRouter } from 'next/router';
import { FormEvent, MouseEvent, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getCookie } from '../components/cookie';

type ChattingData = {
  sender: string;
  content: string;
  dateTime: string;
};

type ChattingDataWithName = ChattingData & { name: string };
type SocketChattingData = ChattingData & { roomId: string; type: string };

const socket = io(`${process.env.NEXT_PUBLIC_PREFIX_DEV}/chattingRoom`, {
  transports: ['polling'],
});

const ChattingRoom = () => {
  const [chattingData, setChattingData] = useState<ChattingDataWithName[]>([]);
  const [content, setContent] = useState<string>('');
  let displayChattingData: Array<ChattingDataWithName> = [];

  const getChattingData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PREFIX_DEV}/chatting/getChattingData/간럿섬외능낌킵븐앳빙띳쌜`
    );
    const data = res.data;
    await Promise.all(
      data.map(async (id: ChattingData) => {
        const nameRes = await axios.get(
          `${process.env.NEXT_PUBLIC_PREFIX_DEV}/user/getName/${id.sender}`
        );
        const name = nameRes.data.displayUserName;
        displayChattingData.push({
          ...id,
          name,
        });
      })
    );

    setChattingData(displayChattingData);
  };

  useEffect(() => {
    getChattingData();
    socket.emit('enter', {
      uid: getCookie('uid'),
      roomId: '간럿섬외능낌킵븐앳빙띳쌜',
    });
  }, []);

  useEffect(() => {
    displayChattingData.map((data, i) => {
      return (
        <div key={i}>
          {data.name} - {data.content}
        </div>
      );
    });
  }, [displayChattingData]);

  useEffect(() => {
    socket.on('listen', (data: SocketChattingData) => {
      console.log(data);

      displayChattingData.push({
        content: data.content,
        dateTime: data.dateTime,
        name: data.sender,
        sender: data.sender,
      });

      // chatting

      // setChattingData([
      //   ...chattingData,
      //   {
      // content: data.content,
      // dateTime: data.dateTime,
      // name: data.sender,
      // sender: data.sender,
      //   },
      // ]);
    });
  });

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    socket.emit('speak', {
      roomId: '간럿섬외능낌킵븐앳빙띳쌜',
      sender: getCookie('uid'),
      type: 'msg',
      content: content,
      dateTime: '2022-02-25 23:32:00',
    });
    setContent('');
  };

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setContent(e.currentTarget.value);
  };

  return (
    <>
      <div>
        {displayChattingData.map((data, i) => {
          return (
            <div key={i}>
              {data.name} - {data.content}
            </div>
          );
        })}
      </div>
      <div>
        <input
          className='outline outline-offset-2 outline-1'
          onChange={onChange}
        />
        <button onClick={onClick}>전송</button>
      </div>
    </>
  );
};

export default ChattingRoom;
