import React, { HTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';
import styles from './button.module.scss';
import Loader from '../Loader';


export interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  theme?: 'primary' | 'secondary' | 'plain' | 'reject' | 'reset' | 'grey';
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  width?: number;
  height?: number;
  wide?: boolean;
  onClick?: () => void;
  align?: 'left' | 'center';
  icon?: any
}
const Button = ({
  children,
  width,
  height,
  size = 'md',
  disabled = false,
  variant = 'solid',
  type = 'button',
  align,
  wide,
  onClick,
  loading,
  theme,
  icon,
  ...props
}: Props) => {
  const { className, ...args } = props;

  return (
    <button
      onClick={onClick}
      type={type}
      style={{ width: `${width}px`, height: `${height}px` }}
      className={classnames(
        styles.btn,
        styles[`btn__${theme}`],
        styles[`${variant}`],
        wide && styles.wide,
        align && styles[`${align}`],
        styles[`btn__${size}`],
        className
      )}
      disabled={disabled}
      {...args}
    >
      {loading ? <Loader /> : children}
      {icon ||  null}
    </button>
  );
};

Button.defaultProps = {
  theme: 'primary',
  variant: 'solid',
  size: 'md',
  loading: false,
  disabled: false,
  type: 'button',
  width: null,
  wide: false,
  onClick: null,
  align: 'center',
  height: null,
  icon: null
};

export default Button;

