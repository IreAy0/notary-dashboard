/* eslint-disable import/no-dynamic-require */
import React from 'react';
import classnames from 'classnames';
import styles from './metrics.module.scss';

export interface Props {
  iconPath?: string;
  label: string;
  value: number | string;
  loading?: boolean;
  theme?: 'grey' | 'purple' | 'green' | 'blue' | 'white';
}

const Metric = ({ label, value, iconPath, loading, theme }: Props) => (
  <div className={classnames(styles.card, styles[`card__${theme}`])}>
    {loading ? (
      <div className={styles.card__skeleton}>
        <div className="">
          <div className={styles.primary} />
          <div className={styles.secondary} />
        </div>
        <div className={styles.circle} />
      </div>
    ) : (
      <>
        <div className="">
        <span className={styles.card__icon}>
          {/* eslint-disable-next-line global-require */}
          <img src={iconPath} alt="icon" />
        </span>
          <p className={styles.card__title}>{value || 0}</p>
          <span className={styles.card__label}>{label}</span>
        </div>
      </>
    )}
  </div>
);

Metric.defaultProps = {
  iconPath: "",
  loading: false,
  theme: 'grey'
}
export default Metric;
