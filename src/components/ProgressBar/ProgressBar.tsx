import React, { HTMLAttributes } from 'react';
import styles from './ProgressBar.module.scss';

export interface IProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  Level: number;
  Color: string;
}

export const ProgressBar = ({ Level, Color }: IProgressBarProps) => (
  <div className={styles.progressBarWrapper}>
    <span className={styles.progressLine} style={{ backgroundColor: Color, width: `${Level}%` }} />
    <span className={styles.staticLine} />
  </div>
);
