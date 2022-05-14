import axios from 'axios';
import { getCookie } from '../components/cookie';
import { UserInfo } from '../types';

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

export async function getUserByUid(uid: string): Promise<UserInfo> {
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


export async function createUser(displayUserName: string, email: string, signDate: string): Promise<string> {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/user/createUser`,
    {
      displayUserName: displayUserName,
      email: email,
      signDate: signDate
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  );

  const { uid } = res.data;

  return uid === '' ? '' : uid;
}

export async function getCurrentUserByUid(): Promise<UserInfo> {
  return getUserByUid(getCookie('uid'));
}

