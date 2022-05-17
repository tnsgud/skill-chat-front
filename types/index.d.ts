export type User = {
  displayUserName:string,
  email:string,
  chatList:string[],
  friendList:string[],
  photo:string|null,
  uid:string
}

export type ChattingData = {
  sender: string;
  content: string;
  dateTime: string;
  type: string
};

export type SocketChattingData = ChattingData & { roomId: string; };