import React, { useEffect, useState } from 'react';
import styles from './RadioInput.module.scss';

export interface IRadioInputProps {
  validate?: boolean;
  type?: string;
  disabled?: boolean;
  item?: {
    name?: string;
    id: string;
    value: boolean;
    type: string;
  };
  label: string;
  onChange?: any;
  defaultChecked?: boolean;
  style: any;
  ref: any;
  

}

export const RadioInput = ({ type, disabled, item, onChange, label, defaultChecked, style, ref, ...props }: IRadioInputProps) => {
  const [checked, setChecked] = useState(defaultChecked);

  useEffect(() => {
    setChecked(defaultChecked)
  },
  [defaultChecked]);
  
  return (
    <div className={styles.radio_input_container}>
      <input
        {...props}
        ref={ref}
        type={type}
        disabled={disabled}
       
        className={styles.radio_input}
        id={label}
        checked={checked}
        onChange={() => {
          setChecked(!checked)
          onChange(item)
        }}
      />
      <label style={style} className={styles.radio_input_label } htmlFor={label}>
        {label}
      </label>
    </div>
  );
};

RadioInput.defaultProps = {
  validate: false,
  disabled: false,
  defaultChecked: false,
  type: 'radio',
  item:null,
  onChange: ''
  
};
