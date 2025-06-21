import { checkUser } from '@/lib/checkUser';
import HeaderClient from './HeaderClient';

const Header = async () => {
  await checkUser(); // this runs server-side
  return <HeaderClient />;
};

export default Header;
