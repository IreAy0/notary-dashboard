import React from 'react';
import styles from './index.module.scss';

const DocumentLoader = () => (
  <div className={styles.skeleton__document}>
    <div className={styles.skeleton__head} />
    <div className={styles.skeleton__shimmer} />
    <div className={styles.skeleton__shimmer} />
    <div className={styles.skeleton__shimmer} />
    <br />
    <div className={styles.skeleton__head} />
    <div className={styles.skeleton__shimmer} />
    <div className={styles.skeleton__shimmer} />
    <br />
    <div className={styles.skeleton__head} />
    <div className={styles.skeleton__shimmer} />
    <div className={styles.skeleton__shimmer} />
    <br />
    <div className={styles.skeleton__head} />
    <div className={styles.skeleton__shimmer} />
    <div className={styles.skeleton__shimmer} />
    <br />
    <div className={styles.skeleton__head} />
    <div className={styles.skeleton__shimmer} />
    <div className={styles.skeleton__shimmer} />
  </div>
);

export default DocumentLoader;
