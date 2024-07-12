import { Outlet, useLocation } from 'react-router-dom';
import Home from '../../pages/home/Home';
import Header from './Header';

function Layout() {
  const path = useLocation();

  return (
    <div className="flex min-h-full w-full min-w-full flex-col justify-center">
      <Header />
      <div
        className={`${path.pathname.includes('details') ? 'flex gap-8' : ''}`}
      >
        <div
          className={`${path.pathname.includes('details') ? 'flex-[1_1_0] flex-nowrap' : ''}`}
        >
          <Home />
        </div>
        <div
          className={`${path.pathname.includes('details') ? 'flex-[1_1_1]' : ''}`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
