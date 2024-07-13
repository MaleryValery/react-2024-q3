import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Home from '../../pages/home/Home';
import Header from './Header';

function Layout() {
  const path = useLocation();
  const navigate = useNavigate();

  const onClose = () => {
    if (location.pathname.includes('details')) navigate(-1);
  };

  return (
    <div className="relative flex min-h-full w-full min-w-full flex-col justify-center">
      <Header />
      <div
        className={`${path.pathname.includes('details') ? 'flex w-full gap-8' : ''}`}
      >
        <div
          role={path.pathname.includes('details') ? 'container' : 'button'}
          className={`${path.pathname.includes('details') ? 'flex-[0_1_50%]' : ''}`}
        >
          <Home />
        </div>
        <div
          tabIndex={0}
          aria-label="overlay"
          onKeyDown={onClose}
          role="button"
          onClick={onClose}
          className={`${path.pathname.includes('details') ? 'absolute top-0 h-full w-full bg-black/40' : ''}`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${path.pathname.includes('details') ? 'ml-auto mt-16 w-1/2' : ''}`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
