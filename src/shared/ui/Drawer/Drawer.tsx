import { resetSelectedCards } from '@/app/redux/cardsSlice';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { downloadFile } from '@/shared/utils/downloadFile';
import Button from '../Button/Button';

function Drawer() {
  const { selectedCards } = useAppSelector((state) => state.cards);
  const dispatch = useAppDispatch();
  const numberOfSelectedCards = Object.keys(selectedCards).length;

  const handlerResetStore = () => {
    dispatch(resetSelectedCards());
  };

  const handlerDownload = () => {
    downloadFile(selectedCards, `${numberOfSelectedCards}_cards`);
  };

  return (
    <div className="fixed bottom-0 flex h-20 w-screen items-center justify-center gap-6 bg-gray-100 dark:bg-black dark:text-white">
      {numberOfSelectedCards} cards selected in Drawer
      <Button
        onClick={handlerDownload}
        className="rounded-md border border-red-500 px-2 py-1 transition-all duration-300 hover:bg-red-500"
      >
        Download
      </Button>
      <Button
        className="rounded-md border border-blue-500 px-2 py-1 transition-all duration-300 hover:bg-blue-500"
        onClick={handlerResetStore}
      >
        Unselect all
      </Button>
    </div>
  );
}

export default Drawer;
