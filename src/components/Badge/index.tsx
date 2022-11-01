import React, { ReactNode } from 'react';
import classnames from 'classnames';
import styles from './badge.module.scss';

export interface BadgeProps {
  theme?: string;
  children: ReactNode;
  type?: string;
  size?: string;
}

const Badge = ({ type = 'primary', theme = 'default', size, children }: BadgeProps) => {
  const badgeClass = (): string => {
    if (type) {
      return styles[`badge__${type}`];
    }

    return '';
  };

  return (
    <span className={classnames(styles.badge, badgeClass(), size && `${styles[size]}`, theme && `${styles[theme]}`, `${styles[type]}`)}>
      {children}
    </span>
  );
};

Badge.defaultProps = {
  theme: "",
  type: "",
  size: ""
}

export default Badge;
