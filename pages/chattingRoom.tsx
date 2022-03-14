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
  transports: ['polling']
});

const ChattingRoom = () => {
  const [chattingData, setChattingData] = useState<ChattingDataWithName[]>([]);
  const [content, setContent] = useState<string>('');

  const getChattingData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PREFIX_DEV}/chatting/getChattingData/간럿섬외능낌킵븐앳빙띳쌜`
    );
    const data = res.data;
    setChattingData(data);
  };

  useEffect(() => {
    getChattingData();
    socket.emit('enter', {
      uid: getCookie('uid'),
      roomId: '간럿섬외능낌킵븐앳빙띳쌜'
    });
  }, []);

  useEffect(() => {
    socket.on('listen', (data: SocketChattingData) => {
      setChattingData([...chattingData, {
        name:'',
        sender: data.sender,
        content: data.content,
        dateTime: data.dateTime
      }]);
    });
  });

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    socket.emit('speak', {
      roomId: '간럿섬외능낌킵븐앳빙띳쌜',
      sender: getCookie('uid'),
      type: 'msg',
      content: content,
      dateTime: '2022-02-25 23:32:00'
    });
    setContent('');

  };

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setContent(e.currentTarget.value);
  };

  return (
    <>
      <div>
        {
          chattingData.map((data, index) => {
            const isMe = data.sender === '갠늄않론뫄뫈캥얌매쑹박왕';
            return <div key={index} className={`${isMe ? 'flex justify-end' : 'flex justify-start'} p-2`}>
              <div className={`${isMe ? 'bg-blue-200 ':'bg-blue-400'} text-center w-fit p-5 rounded-xl`}>{data.content}</div>
            </div>;
          })
        }
      </div>
      <div>
        <input
          value={content}
          className='outline outline-offset-2 outline-1'
          onChange={onChange}
        />
        <button onClick={onClick}>전송</button>
      </div>
    </>
  );
};

export default ChattingRoom;
