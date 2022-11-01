import React, { FC } from 'react';
import styles from '../../../../settings.module.scss';

interface Props {
  time: string;
  disabled: boolean;
  onButtonClick: () => void;
  active: boolean;
}

const TimeButton: FC<Props> = ({ time, disabled, onButtonClick, active }: Props) => (
  <button id="timeButton" className={active ? styles.time__timeSelected : styles.time} onClick={onButtonClick} disabled={disabled}>
    {time}
  </button>
);

export default TimeButton;
