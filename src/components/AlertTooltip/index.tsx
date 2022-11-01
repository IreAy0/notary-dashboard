import React, { HTMLAttributes, useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './AlertTooltip.module.scss';

export interface IAlertTooltipProps extends HTMLAttributes<HTMLDivElement> {
  errorText: string;
  error: boolean;
  showAlertTooltip?: boolean;
  radio?: boolean;
  resetPosition?: boolean;
}

const AlertTooltip = ({ errorText, error, showAlertTooltip, radio, resetPosition }: IAlertTooltipProps) => {
  const [isShow, setIsShow] = useState<boolean>(error);

  useEffect(() => {
    setIsShow(error);
  }, [error]);

  if (!showAlertTooltip || !isShow) {
    return <></>;
  }

  return (
    <span className={classnames(styles.alert, radio && styles.alert__radio, resetPosition ? styles.alert__default : '')}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 3.582 12.418 0 8 0ZM8 13.1067C7.37467 13.1067 6.94667 12.6247 6.94667 12C6.94667 11.3573 7.39267 10.8933 8 10.8933C8.642 10.8933 9.05333 11.3573 9.05333 12C9.05333 12.6253 8.642 13.1067 8 13.1067ZM8.41467 8.88067C8.25533 9.424 7.75333 9.43333 7.586 8.88067C7.39333 8.24333 6.70867 5.824 6.70867 4.25267C6.70867 2.17933 9.30267 2.16933 9.30267 4.25267C9.302 5.83333 8.58067 8.31533 8.41467 8.88067Z"
          fill="white"
          fillOpacity="0.7"
        />
      </svg>
      <span className={styles.alert__errorText}>{errorText}</span>
      <button className={styles.alert__close} onClick={() => setIsShow(false)}>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.15069 4.12785C5.07763 4.05479 5.07763 3.94521 5.15069 3.87215L7.89041 1.13242C7.96347 1.05936 8 0.949772 8 0.876712C8 0.803653 7.96347 0.694064 7.89041 0.621005L7.379 0.109589C7.30594 0.0365297 7.19635 0 7.12329 0C7.0137 0 6.94064 0.0365297 6.86758 0.109589L4.12785 2.84932C4.05479 2.92237 3.94521 2.92237 3.87215 2.84932L1.13242 0.109589C1.05936 0.0365297 0.949772 0 0.876712 0C0.803653 0 0.694064 0.0365297 0.621005 0.109589L0.109589 0.621005C0.0365297 0.694064 0 0.803653 0 0.876712C0 0.949772 0.0365297 1.05936 0.109589 1.13242L2.84932 3.87215C2.92237 3.94521 2.92237 4.05479 2.84932 4.12785L0.109589 6.86758C0.0365297 6.94064 0 7.05023 0 7.12329C0 7.19635 0.0365297 7.30594 0.109589 7.379L0.621005 7.89041C0.694064 7.96347 0.803653 8 0.876712 8C0.949772 8 1.05936 7.96347 1.13242 7.89041L3.87215 5.15069C3.94521 5.07763 4.05479 5.07763 4.12785 5.15069L6.86758 7.89041C6.94064 7.96347 7.05023 8 7.12329 8C7.19635 8 7.30594 7.96347 7.379 7.89041L7.89041 7.379C7.96347 7.30594 8 7.19635 8 7.12329C8 7.05023 7.96347 6.94064 7.89041 6.86758L5.15069 4.12785Z"
            fill="white"
            fillOpacity="0.7"
          />
        </svg>
      </button>
    </span>
  );
};

AlertTooltip.defaultProps = {
  resetPosition: false,
  radio: false,
  showAlertTooltip: false
};

export default AlertTooltip;
