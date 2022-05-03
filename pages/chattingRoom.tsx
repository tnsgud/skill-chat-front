import axios from 'axios';
import { useRef } from 'react';
import { FormEvent, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getCookie } from '../components/cookie';
import { ChattingData, SocketChattingData } from '../types';
import { getServerDateTime, getUserNameByUid } from '../lib/utils';

const socket = io(`${process.env.NEXT_PUBLIC_BASE_URL_DEV}/chattingRoom`, {
  transports: ['polling']
});

const ChattingRoom = () => {
  const [chattingData, setChattingData] = useState<ChattingData[]>([]);
  const [content, setContent] = useState<string>('');

  const scrollRef = useRef<HTMLDivElement>(null);

  const getChattingData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/chatting/getChattingData/간럿섬외능낌킵븐앳빙띳쌜`
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
    scrollRef.current?.scrollIntoView({behavior:'auto', block:'end', inline: 'nearest'})
  }, [chattingData])

  useEffect(() => {
    socket.on('listen', (data: SocketChattingData) => {
      setChattingData([...chattingData, {
        sender: data.sender,
        content: data.content,
        dateTime: data.dateTime,
        type: data.type
      }]);
    });
  });

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setContent(e.currentTarget.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (content === '') {
      return;
    }

    socket.emit('speak', {
      roomId: '간럿섬외능낌킵븐앳빙띳쌜',
      sender: getCookie('uid'),
      type: 'msg',
      content: content,
      dateTime: await getServerDateTime()
    });



    setContent('');
  };

  return (
    <div className={'relative bg-gray-700'} ref={scrollRef}>
      <div className={'py-16'}>
        {
          chattingData.map((data, index) => {
            const isMe = data.sender === getCookie('uid');
            return <div key={index} className={`${isMe ? 'flex justify-end' : 'flex justify-start'} p-2`}>
              <div
                className={`${isMe ? 'bg-blue-200 ' : 'bg-blue-400'} text-center w-fit p-5 rounded-xl`}>{data.content}</div>
            </div>;
          })
        }
      </div>
      <form className={'fixed bottom-0 right-0 left-0 bg-gray-700'} onSubmit={onSubmit}>
        <input
          value={content}
          className={'w-full h-16'}
          onChange={onChange}
        />
      </form>
    </div>
  );
};

export default ChattingRoom;
