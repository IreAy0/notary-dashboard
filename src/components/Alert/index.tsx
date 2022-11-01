import React, { HTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';
import styles from './Alert.module.scss';
import { ReactComponent as SuccessIcon } from '../../assets/icons/successIcon.svg';
import { ReactComponent as ErrorIcon } from '../../assets/icons/errorIcon.svg';
import { ReactComponent as InfoIcon } from '../../assets/icons/infoIcon.svg';

export interface IAlertProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  type: string;
  children?: ReactNode;
}

const Alert = ({ title, type, children }: IAlertProps) => {
  let icon;
  let color;

  switch (type) {
    case 'success':
      icon = <SuccessIcon />;
      color = '#2FA36B';
      break;
    case 'error':
      icon = <ErrorIcon />;
      color = '#D35B63';
      break;
    default:
      icon = <InfoIcon />;
      color = '#FF9900';
      break;
  }

  return (
    <span className={classnames(styles.alert, styles[`alert__${type}`])}>
      <span className={styles.alert__icon}>{icon}</span>
      <span className={`${styles.alert__title}`} style={{ color }}>
        {children ? <>{children}</> : <>{title}</>}
      </span>
    </span>
  );
};

Alert.defaultProps = {
  title: '',
  children: {}
}

export default Alert;
