import React from 'react';
import classnames from 'classnames';
import styles from './index.module.scss';

interface Prop {
  children: React.ReactNode;
  theme: string;
  onClick?(): void;
  showCancel?: boolean;
  onCancel?: any;
  toolbar?: boolean;
}

const SignPlaceholder = ({ children, theme, onClick, showCancel, onCancel, toolbar, ...props }: Prop) => (
  <span
    aria-hidden="true"
    onFocus={(e) => e.preventDefault()}
    onClick={onClick}
    {...props}
    className={classnames(toolbar ? styles.tool__placeholder : styles.placeholder, styles[theme])}
  >
    {children}
    {showCancel && (
      <button onClick={onCancel} type="button" className={styles.icon}>
        <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="20" rx="10" fill="red" />
          <path
            d="M14.2 5.807a.664.664 0 0 0-.94 0L10 9.06 6.74 5.8a.664.664 0 1 0-.94.94L9.06 10 5.8 13.26a.664.664 0 1 0 .94.94L10 10.94l3.26 3.26a.664.664 0 1 0 .94-.94L10.94 10l3.26-3.26a.668.668 0 0 0 0-.933Z"
            fill="#fff"
          />
        </svg>
      </button>
    )}
  </span>
);

SignPlaceholder.defaultProps = {
  onClick: () => {},
  showCancel: false,
  onCancel: () => {},
  toolbar: false
};

export default SignPlaceholder;

