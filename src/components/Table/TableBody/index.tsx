import React, { ReactChildren, ReactChild, ReactNode } from 'react';
import placeholder from 'assets/icons/table-placeholder.svg';
import styles from '../table.module.scss';

type TableItem = {
  [k: string]: string | number | boolean | Array<string | number | object> | null;
};

interface BodyProps {
  tableData: TableItem[];
  content(row: { [k: string]: string | number | boolean | Array<string | number | object> | null }): ReactChildren | ReactChild;
  cols: number;
  placeHolderImg?: ReactNode;
  showSecondary?: boolean;
}

const TableBody = ({ tableData, content, cols, placeHolderImg, showSecondary }: BodyProps) => (
  <tbody className="table__body">
    {!tableData?.length && (
      <tr className={styles.table__row}>
        <td className="" colSpan={cols}>
          <div className="flex flex__center mt-3">{placeHolderImg || <img src={placeholder} alt="" />}</div>
        </td>
      </tr>
    )}
    {tableData?.map((row, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <tr className={!showSecondary ? styles.table__row : styles.table__row__secondary} key={index}>
        <>{content(row)}</>
      </tr>
    ))}
  </tbody>
);
TableBody.defaultProps = {
  placeHolderImg: null,
  showSecondary: false
};

export default TableBody;
