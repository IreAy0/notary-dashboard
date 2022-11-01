/* eslint-disable object-curly-newline */
import React, { ChangeEvent, HTMLAttributes, useState, ReactNode } from 'react';
import classnames from 'classnames';
import AlertTooltip from 'components/AlertTooltip';
import { string } from 'yup';
import Verified from 'assets/icons/assets/verified.png';
import styles from './input.module.scss';

export interface Props extends HTMLAttributes<HTMLInputElement> {
  type: 'text' | 'date' | 'radio' | 'checkbox' | 'phone' | 'password' | 'number';
  placeholder?: string;
  children?: ReactNode;
  name?: string;
  icon?: string;
  value?: string | undefined | any;
  checked?: boolean;
  id?: string;
  label?: ReactNode;
  className?: string;
  error?: boolean;
  errorText?: string;
  autoComplete?: 'on' | 'off';
  showAlertTooltip?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?(): (value: string) => void;
  onBlur?(): (value: string) => void;
  field?: {
    name?: string | '';
    value?: string | '';
    onFocus?(): (value: string) => void;
    onBlur?(): (value: string) => void;
    onChange?(): (value: string) => void;
  };
  form?: any;
  disabled?: boolean;
  verifiedCheck?: boolean;
  scnNumber?: boolean;
  maxLength?: number;
  minLength?: string;
}

export const Input = ({
  type = 'text',
  placeholder,
  name,
  onChange,
  checked,
  value,
  label,
  className,
  id,
  error = false,
  errorText = '',
  autoComplete = 'on',
  disabled = false,
  showAlertTooltip = false,
  field,
  form,
  children,
  onFocus,
  onBlur,
  maxLength,
  verifiedCheck,
  scnNumber,
  minLength,
  ...props
}: Props) => {
  const [inputType, setInputType] = useState<string>(type);
  const touchedCheck = form && field && form.touched && form.touched[field && field.name!];
  const errorCheck = form && field && form.errors && form.errors[field && field.name!];
  const formError = touchedCheck && errorCheck;

  return (
    <>
      <label className={classnames(styles.input__label, styles[`${type}`], className)} htmlFor={id}>
        {(label || children) && (
          <span className="flex flex__item-center">
            {children}
            {label}
          </span>
        )}
        {error && type !== 'radio' && (
          <span className={classnames(styles.input__error_icon, type === 'password' && styles.input__error_icon__password)}>
            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM6.83881 3.54547H9.16089L8.94854 10.1055H7.05116L6.83881 3.54547ZM9.20244 11.9336C9.19321 12.5984 8.63461 13.1339 8.00216 13.1339C7.33738 13.1339 6.79264 12.5984 6.80187 11.9336C6.79264 11.2781 7.33738 10.7472 8.00216 10.7472C8.63461 10.7472 9.19321 11.2781 9.20244 11.9336Z"
                fill="#EE0004"
              />
            </svg>
          </span>
        )}
        {showAlertTooltip && (
          <AlertTooltip error={error} errorText={errorText} showAlertTooltip={showAlertTooltip} radio={type === 'radio'} />
        )}
        <input
          type={inputType}
          id={id}
          disabled={disabled}
          placeholder={placeholder}
          name={(field && field?.name) || name}
          value={(field && field?.value) || value}
          checked={checked}
          autoComplete={autoComplete}
          className={classnames(styles.input, error && styles.input__error, error && type === 'radio' && styles.input__radio_error)}
          onChange={(field && field?.onChange) || onChange}
          onFocus={(field && field?.onFocus) || onFocus}
          onBlur={(field && field?.onBlur) || onBlur}
          maxLength={maxLength} 
          pattern={minLength}
          {...props}
        />

        <button
          type="button"
          className={styles.input__btn}
          aria-label="Show password"
          onClick={() => (type === 'password' ? setInputType(inputType === 'password' ? 'text' : 'password') : null)}
        >
          {type === 'password' && (
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {inputType === 'password' ? (
                <path
                  d="m11.62 14.238-2.328-1.825A2.249 2.249 0 0 0 11.5 14.25c.041 0 .08-.01.12-.012Zm-.119 1.137H11.5A3.376 3.376 0 0 1 8.125 12c0-.159.025-.311.047-.464L5.905 9.759a9.355 9.355 0 0 0-1.074 1.842 1.204 1.204 0 0 0-.081.4c0 .116.037.294.081.398C6.103 15.292 8.62 17.25 11.5 17.25c1.066 0 2.08-.27 3.002-.753l-1.747-1.369c-.388.156-.81.247-1.254.247Zm7.284 1.62-2.43-1.905a9.01 9.01 0 0 0 1.814-2.69c.044-.105.08-.284.08-.4 0-.117-.036-.295-.08-.399-1.272-2.893-3.788-4.85-6.669-4.85-1.47 0-2.841.513-4.004 1.396L4.91 6.12a.562.562 0 0 0-.695.885L18.09 17.88a.562.562 0 1 0 .695-.885ZM14.875 12c0 .583-.157 1.124-.42 1.6l-.904-.709c.123-.273.199-.572.199-.892a2.25 2.25 0 0 0-2.25-2.25h-.005c-.054 0-.126.01-.193.018.122.217.198.465.198.732 0 .239-.06.46-.16.66L9.243 9.515a3.322 3.322 0 0 1 2.257-.89A3.376 3.376 0 0 1 14.875 12v.002Z"
                  fill="#363740"
                />
              ) : (
                <path
                  d="M18.419 11.6c-1.272-2.892-3.788-4.85-6.669-4.85S6.352 8.709 5.081 11.6A1.204 1.204 0 0 0 5 12c0 .117.037.295.081.399 1.272 2.893 3.788 4.851 6.669 4.851s5.398-1.959 6.669-4.851c.044-.104.081-.283.081-.399 0-.117-.037-.295-.081-.4Zm-3.294.402a3.375 3.375 0 0 1-3.373 3.373h-.002a3.376 3.376 0 0 1 0-6.75A3.376 3.376 0 0 1 15.125 12v.002ZM11.75 9.75h-.005c-.054 0-.126.01-.193.018.122.217.198.465.198.732a1.5 1.5 0 0 1-1.5 1.5c-.268 0-.517-.076-.735-.2-.006.07-.015.144-.015.2a2.25 2.25 0 1 0 2.25-2.25Z"
                  fill="#363740"
                />
              )}
            </svg>
          )}
          {type !== 'password' && verifiedCheck && (
            <div>
              <img src={Verified} alt="verified" style={{ width: '20px' }} />
            </div>
          )}
          {type !== 'password' && scnNumber && (
            <div>
              <p>SCN</p>
            </div>
          )}
        </button>
      </label>
      {formError && <small className={classnames(styles.formik__errors)}>{form.errors[field && field.name!]}</small>}
    </>
  );
};

Input.defaultProps = {
  placeholder: '',
  children: null,
  name: '',
  icon: '',
  value: '',
  checked: false,
  id: '',
  label: null,
  error: false,
  errorText: string,
  autoComplete: 'off',
  showAlertTooltip: false,
  field: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
  form: null,
  disabled: false,
  className: "",
  verifiedCheck: false, 
  maxLength: null,
  scnNumber: false,
  minLength: null
}
