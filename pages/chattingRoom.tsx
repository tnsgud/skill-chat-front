import { useRouter } from 'next/router';

const ChattingRoom = () => {
  const { uid } = useRouter().query;

  return <div>{uid}</div>;
};

export default ChattingRoom;
