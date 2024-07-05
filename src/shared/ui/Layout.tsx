import { Outlet } from 'react-router-dom';
import Home from '../../pages/home/Home';
import Header from './Header';

function Layout() {
  return (
    <div className="flex min-h-full w-full min-w-full flex-col justify-center">
      <Header />
      <div>
        <Home />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
