import React from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import styles from './phone.module.scss';

interface Props {
  placeholder?: string;
  onChange: (val: string, country: any, e: any, formattedValue: string) => void;
  value: string;
  inputProps?: object;
}

const Phone = ({ placeholder, value, inputProps, onChange }: Props) => (
  <PhoneInput
    onlyCountries={['ng']}
    country="ng"
    inputClass={styles.tel__phone}
    buttonClass={styles.tel__dropdown}
    dropdownClass={styles.tel__input}
    placeholder={placeholder}
    enableAreaCodes
    value={value}
    inputProps={inputProps}
    onChange={onChange}
    countryCodeEditable={false}
    autoFormat={false}
  />
);
Phone.defaultProps = {
  placeholder: '',
  inputProps: {}
};

export default Phone;
