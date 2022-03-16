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
    console.log(content === '');

  };

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setContent(e.currentTarget.value);
  };

  const onKeyPress = (e:FormEvent<HTMLInputElement>) =>{
    if(content === '') {
      return;
    }
    socket.emit('speak', {
      roomId: '간럿섬외능낌킵븐앳빙띳쌜',
      sender: getCookie('uid'),
      type: 'msg',
      content: content,
      dateTime: '2022-02-25 23:32:00'
    });
    setContent('')
  }

  return (
    <div className={'relative bg-gray-700'}>
      <div className={'py-16'}>
        {
          chattingData.map((data, index) => {
            const isMe = data.sender === getCookie('uid');
            return <div key={index} className={`${isMe ? 'flex justify-end' : 'flex justify-start'} p-2`}>
              <div className={`${isMe ? 'bg-blue-200 ':'bg-blue-400'} text-center w-fit p-5 rounded-xl`}>{data.content}</div>
            </div>;
          })
        }
      </div>
      <div className={'fixed bottom-0 right-0 left-0 bg-gray-700'}>
        <input
          value={content}
          className={'w-full'}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </div>
    </div>
  );
};

export default ChattingRoom;
