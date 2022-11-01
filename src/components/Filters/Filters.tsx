import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';
import Button from 'components/Button';
import styles from './Filters.module.scss';

export interface IFiltersProps extends HTMLAttributes<HTMLDivElement> {
  filters?: number;
  onFilter?: any;
  filterBtn?: boolean;
  primary?: boolean;
  disableSearchBtn?: boolean;
  isClickedFilter?: (data: any) => void;
  onClick: (data: any) => void;
  disableFilter?: boolean;
  searchBtn?: boolean;
}

export const Filters = ({
  children,
  filters,
  isClickedFilter,
  onClick,
  filterBtn,
  primary,
  onFilter,
  disableSearchBtn,
  disableFilter,
  searchBtn,
  ...props
}: IFiltersProps) => (
    <div className={styles.filterWrapper} {...props}>
      <div>{children}</div>
      <div className="flex flex__item-center">
        {searchBtn && <Button
          onClick={onFilter}
          theme="primary"
          className={primary || !disableSearchBtn ? classnames(styles.searchBtn2, 'mx-1') : styles.searchBtn}
          disabled={disableSearchBtn}
        >
          Search
        </Button>}
        {filterBtn && (
          <Button
            onClick={() => onClick(!isClickedFilter)}
            className={!filters && !disableFilter ? classnames(styles.filterBtn, 'ml-0') : classnames(styles.hasFiltersBtn, 'ml-0')}
            disabled={disableFilter}
          >
            Filter
            {filters && <div className={styles.filtersCount}>{filters}</div>}
          </Button>
        )}
      </div>
    </div>
);

Filters.defaultProps = {
  filters: null,
  onFilter: null,
  disableSearchBtn: false,
  filterBtn: true,
  isClickedFilter: null,
  primary: false,
  disableFilter: false,
  searchBtn: false
};
