import Link from 'next/link';

const linkStyle = {
  marginRight: 15,
};

const Header = () => (
  <div className='ml-5 mt-5'>
    <Link href={'/home'}>
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href={'/chattingRoomList'} >
      <a style={linkStyle}>chat</a>
    </Link>
  </div>
);

export default Header;
