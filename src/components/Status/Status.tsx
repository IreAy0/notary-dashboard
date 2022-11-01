import React, { HTMLAttributes } from 'react';
import styles from './Status.module.scss';

export interface IStatusProps extends HTMLAttributes<HTMLDivElement> {
  // Color: string;
  Text: string;
}

export const Status = ({ Text }: IStatusProps) => {
  let color;

  switch (Text) {
    case 'Pending':
      color = '#FF9900';
      break;
    case 'Scheduled':
      color = '#458FFF';
      break;
    case 'Withdrawn':
    case 'Blacklisted':
      color = '#7B7171';
      break;
    case 'Verified':
      color = '#00A6A9';
      break;
    case 'Incomplete':
      color = '#BB981D';
      break;
    case 'Failed':
      color = '#E05A5C';
      break;
    default:
      color = '#FF9900';
  }

  return (
    <div className={styles.statusWrapper} style={{ background: color }}>
      <p>{Text}</p>
    </div>
  );
};
