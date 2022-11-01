import React, { ReactNode } from 'react';
import classnames from 'classnames';
import styles from './card.module.scss';

interface Props {
  children: ReactNode;
  title: string;
  value: string;
  active: boolean;
  name: string;
  disabled?: boolean;
  action: () => void;
}

const Card = ({ children, name, title, disabled, value, action, active, ...props }: Props) => (
  <label {...props} htmlFor={title} className={classnames(styles.card, active && styles.active)}>
    <input disabled={disabled} onClick={action} className="sr-only" name={name} id={title} type="radio" />
    <div className={styles.card__header}>
      <span />
      <h2 className={styles.card__title}>
        <svg className="mr-1" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          {active ? (
            <path
              d="M10 20C4.48 19.994.006 15.52 0 10v-.2C.11 4.305 4.635-.072 10.13 0c5.497.074 9.904 4.569 9.868 10.065C19.962 15.562 15.497 20 10 20ZM5.41 9.59 4 11l4 4 8-8-1.41-1.42L8 12.17 5.41 9.59Z"
              fill="#fff"
            />
          ) : (
            <circle cx="10" cy="10" r="9" stroke="#363740" strokeWidth="2" />
          )}
        </svg>
        {title}
      </h2>
      <h2 className={styles.card__meta}>{value}</h2>
    </div>
    {children}
  </label>
);

Card.defaultProps = {
  disabled: false
};

export default Card;
