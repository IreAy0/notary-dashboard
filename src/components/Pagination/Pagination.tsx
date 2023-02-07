import React, { ChangeEvent, useRef, useEffect } from 'react';
import classnames from 'classnames';
import styles from './Pagination.module.scss';

export interface Props {
  currentPage: number | string;
  total: number | string;
  perPage: number | string;
  fetchPage(page: number, pageItems: number): void;
}
type PageRange = number | string;
const Pagination = ({ currentPage, total, perPage, fetchPage }: Props) => {
  const [pagesArray, setPagesArray] = React.useState<PageRange[]>([]);
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(Number(perPage));
  const inputRef = useRef<HTMLInputElement>(null);
  const pagesCount = Math.ceil(Number(total) / Number(perPage));
  const goToPage = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPage(Number(currentPage) - 1, itemsPerPage);
  };
  const handleSetPerPage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setItemsPerPage(Number(e.target.value));
  };
  useEffect(() => {
    // modified from: https://stackoverflow.com/questions/55585987/pagination-algorithm-with-ellipsis
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: PageRange[] = [];
    const nrOfPages = Math.ceil(Number(total) / Number(perPage));
    let len: number = 0;
    range.push(1);
    if (nrOfPages <= 1) {
      setPagesArray(range);
      
      return;
    }
    // eslint-disable-next-line no-plusplus
    for (let i = Number(currentPage) - delta; i <= Number(currentPage) + delta; i++) {
      if (i < nrOfPages && i > 1) {
        range.push(i);
      }
    }
    range.push(nrOfPages);
    range.forEach((i) => {
      if (len) {
        if (i - len === 2) {
          rangeWithDots.push(len + 1);
        } else if (i - len !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      len = i;
    });
    setPagesArray(rangeWithDots);
  }, [perPage, total, currentPage]);
  const isActivePage = (page: number) => page === Number(currentPage);

  return (
    <div className={styles.pagination__wrapper}>
      <div className={styles.pagination}>
        <button
          type="button"
          className={styles.pagination__btn}
          disabled={currentPage <= 1}
          onClick={() => fetchPage(Number(currentPage) - 1, itemsPerPage)}
        >
          <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.69922 10.9009C5.56736 11.033 5.42724 11.033 5.27889 10.9009L0.111265 5.6982C-0.0370885 5.56607 -0.0370885 5.43393 0.111265 5.3018L5.27889 0.0990989C5.42724 -0.0330327 5.56735 -0.0330327 5.69922 0.0990989L6.19373 0.594595C6.34209 0.726726 6.34209 0.867117 6.19373 1.01576L1.71842 5.5L6.19373 9.98423C6.34209 10.1329 6.34209 10.2733 6.19373 10.4054L5.69922 10.9009Z"
              fill="#7A7C7E"
            />
          </svg>
          <span className="sr-only">Previous page</span>
        </button>
        {pagesArray.map((page: number | string) =>
          typeof page === 'number' ? (
            <button
              type="button"
              onClick={() => fetchPage(page, itemsPerPage)}
              key={page}
              className={classnames(styles.pagination__btn, isActivePage(page) && styles.active)}
            >
              {page}
            </button>
          ) : (
            <span key={page} className="mx-1">{page}</span>
          )
        )}
        <button
          type="button"
          disabled={currentPage >= pagesCount}
          onClick={() => fetchPage(Number(currentPage) + 1, itemsPerPage)}
          className={styles.pagination__btn}
        >
          <span className="sr-only">Next page</span>
          <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.605463 0.0990988C0.737332 -0.0330333 0.877443 -0.0330333 1.0258 0.0990988L6.19342 5.3018C6.34178 5.43394 6.34178 5.56607 6.19342 5.6982L1.0258 10.9009C0.877443 11.033 0.737331 11.033 0.605462 10.9009L0.110952 10.4054C-0.0374007 10.2733 -0.0374007 10.1329 0.110952 9.98424L4.58627 5.5L0.110953 1.01577C-0.0374003 0.867118 -0.0374003 0.726728 0.110953 0.594596L0.605463 0.0990988Z"
              fill="#7A7C7E"
            />
          </svg>
        </button>
      </div>
      <form className={styles.pagination__form} onSubmit={(e) => goToPage(e)}>
        <span className="">Rows on the page</span>
        <div>
          <input
            className={styles.pagination__input}
            type="number"
            min="1"
            ref={inputRef}
            value={itemsPerPage}
            onChange={handleSetPerPage}
          />
        </div>
      </form>
    </div>
  );
};
export default Pagination;
