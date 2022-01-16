import Header from './Header';
import {
  ReactChild,
  ReactFragment,
  ReactPortal,
} from 'react';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
};

const Layout = (
  props: {
    children:
      | boolean
      | ReactChild
      | ReactFragment
      | ReactPortal
      | null
      | undefined;
  }
) => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
);

export default Layout;
