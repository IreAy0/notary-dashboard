import React, { FC } from 'react';
import styles from './App.module.scss';

const AppProvider: FC = ({ children }) => (
  <>
    <div className={styles.appWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  </>
);

export default AppProvider;
