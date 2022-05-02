import axios from 'axios';
import { getCookie } from '../components/cookie';
import { UserInfo } from '../types';

// const uidRes = await axios.post(
//   `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/user/createUser`,
//   {
//     displayUserName: profileObj.name,
//     email: profileObj.email,
//     signDate: dateRes.data,
//   },
//   {
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//     },
//   }
// );


export async function getUserNameByUid(uid: string): Promise<string> {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_DEV}/user/getName/${uid}`);
  return res.data.displayUserName;
}

export async function getServerDateTime(): Promise<string> {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_DEV}/serverDateTime`);
  return res.data;
}

export async function getUserIdByEmail(email: string): Promise<string> {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_DEV}/user/getUserByEmail/${email}`);
  const { uid } = res.data;
  return uid;
}

export async function getCurrentUserNameByUid(): Promise<string> {
  return getUserNameByUid(getCookie('uid'));
}

export async function getUserInfoByUid(uid: string): Promise<UserInfo> {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_DEV}/user/getAllUserInfo/${uid}`);
  const { data } = res;
  return {
    uid: data.uid,
    email: data.email,
    photo: data.photo,
    chatList: data.chatList,
    friendList: data.friendList,
    displayUserName: data.displayUserName
  };
}

export async function getCurrentUserInfoByUid(): Promise<UserInfo> {
  return getUserInfoByUid(getCookie('uid'));
}

