import useThemeContext from '@/app/context/ContextTheme';
import { setCurrentCard } from '@/app/redux/cardsSlice';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import Home from '@/pages/home/Home';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Drawer from '../Drawer/Drawer';
import Header from '../Header/Header';

function Layout() {
  const path = useLocation();
  const navigate = useNavigate();
  const { isDark } = useThemeContext();
  const dispatch = useAppDispatch();
  const { selectedCards } = useAppSelector((state) => state.cards);

  const numberOfSelectedCards = Object.keys(selectedCards).length;

  const onClose = () => {
    if (location.pathname.includes('details')) navigate(-1);
    dispatch(setCurrentCard(null));
  };

  return (
    <div
      className={`relative flex min-h-full w-full min-w-full flex-col justify-center dark:bg-zinc-600 ${isDark ? 'dark' : ''}`}
    >
      <Header />
      <div
        className={`${path.pathname.includes('details') ? 'flex w-full gap-8' : ''}`}
      >
        <div
          role={path.pathname.includes('details') ? 'container' : 'button'}
          className={`${path.pathname.includes('details') ? 'flex-[0_1_50%] cursor-default' : ''}`}
        >
          <Home />
        </div>
        <div
          tabIndex={0}
          aria-label="overlay"
          onKeyDown={onClose}
          role="button"
          onClick={onClose}
          className={`${path.pathname.includes('details') ? 'absolute top-0 h-full w-full cursor-default bg-black/40' : ''}`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${path.pathname.includes('details') ? 'ml-auto mt-16 w-1/2' : ''}`}
          >
            <Outlet data-testid="outlet" />
          </div>
        </div>
      </div>
      {numberOfSelectedCards > 0 && <Drawer />}
    </div>
  );
}

export default Layout;
