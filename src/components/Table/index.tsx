/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, ReactChild, ReactChildren, ReactNode } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import styles from './table.module.scss';

export type Item = {
  [k: string]: string | number | boolean | Array<string | number | object> | null;
};

export interface TableProps {
  tableData: Item[];
  children(row: { [k: string]: string | number | Array<string | number> }): ReactChildren | ReactChild;
  headers: Item[];
  type: string;
  loading: boolean;
  placeHolderImg?: ReactNode;
  showSecondary?: boolean;
}

const Table = ({ type, headers, children, tableData, loading, placeHolderImg, showSecondary }: TableProps) => {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    setData(tableData);

    return () => {
      setData([]);
    };
  }, [tableData]);

  const sortRows = () => true;

  const tableLoader = (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__head} />
      {headers?.slice(0, 4).map((_, index: number) => (
        <div key={index} className={styles.skeleton__row}>
          {headers?.map((header: string | {}, idx: number) => (
            <div key={idx} className={styles.skeleton__item} />
          ))}
        </div>
      ))}
    </div>
  );

  const table = (
    <table className={`${styles.table}`}>
      <TableHeader type={type} sortRows={sortRows} tableHeaders={headers} showSecondary={showSecondary} />
      <TableBody cols={headers.length} tableData={data} content={children} placeHolderImg={placeHolderImg} showSecondary={showSecondary} />
    </table>
  );

  return loading ? tableLoader : table;
};

Table.defaultProps = {
  placeHolderImg: null,
  showSecondary: false
};

export default Table;
