import useThemeContext from '@/app/context/ContextTheme';
import { FaLightbulb, FaRegLightbulb } from 'react-icons/fa';
import Button from '../Button/Button';

function Header() {
  const { isDark, handleTheme } = useThemeContext();

  return (
    <header
      className="bg- flex w-full gap-6 bg-zinc-700 p-6 dark:bg-zinc-950"
      data-testid="header"
    >
      <h1 className="text-3xl font-semibold uppercase text-red-600">
        Marvel comics
      </h1>
      <Button onClick={handleTheme}>
        {isDark ? (
          <FaLightbulb size={26} className="text-amber-300" />
        ) : (
          <FaRegLightbulb size={26} className="text-white" />
        )}
      </Button>
    </header>
  );
}

export default Header;
