import { useSearchParams } from 'react-router-dom';
import { MetaData } from '../types/response.type';
import Button from './Button';

type PaginatinProps = {
  data: MetaData;
};

function Pagination({ data }: PaginatinProps) {
  const { limit, offset, total } = data;
  const [, setSearchParams] = useSearchParams();

  const curPage = Math.floor(offset / limit) + 1;
  const totalPage = Math.ceil(total / limit);
  const pageNumbers = Array.from({ length: totalPage }).map((_, i) => i + 1);

  const onPrevButton = () => {
    const prevPage = offset - limit;

    const page = prevPage / limit === 0 ? 1 : prevPage / limit + 1;
    setSearchParams({ page: page.toString() });
  };

  const onNextButton = () => {
    const nextPage = offset + limit;
    setSearchParams({ page: (nextPage / limit + 1).toString() });
  };

  const onChangePage = (pageNum: number) => {
    const newPage = pageNum * limit;
    setSearchParams({ page: (newPage / limit + 1).toString() });
  };

  const onLastPage = () => {
    const lastPage = Math.ceil(total / limit) * limit;
    setSearchParams({ page: (lastPage / limit).toString() });
  };

  const generateButtons = () => {
    const currentPages = pageNumbers.slice(
      curPage < 3 ? 0 : curPage - 3,
      curPage < 3 ? 5 : curPage + 2
    );

    return currentPages.map((pageNum) => (
      <Button
        key={pageNum}
        onClick={() => onChangePage(pageNum - 1)}
        title={pageNum.toString()}
        className={`cursor-pointer p-2 text-2xl font-medium ${curPage === pageNum ? 'text-3xl' : 'text-gray-500'}`}
      />
    ));
  };

  const edgearrow = 'h-12 w-12 rounded-full bg-cover disabled:opacity-50';
  const arrow = 'h-8 w-8 rounded-full bg-cover disabled:opacity-50';

  return (
    <div className="flex items-center justify-center gap-8 p-12 text-4xl">
      <Button
        className={`${edgearrow} bg-[url('./shared/assets/first-arrow.svg')]`}
        onClick={() => onChangePage(0)}
        disabled={curPage === 1}
      />
      <Button
        className={`${arrow} bg-[url('./shared/assets/prev-arrow.svg')]`}
        onClick={onPrevButton}
        disabled={curPage === 1}
      />
      <div className="flex items-center justify-center gap-4">
        {generateButtons()}
      </div>
      <Button
        className={`${arrow} bg-[url('./shared/assets/next-arrow.svg')]`}
        onClick={onNextButton}
        disabled={curPage === totalPage}
      />
      <Button
        className={`${edgearrow} bg-[url('./shared/assets/last-arrow.svg')]`}
        onClick={onLastPage}
        disabled={curPage === totalPage}
      />
    </div>
  );
}

export default Pagination;
