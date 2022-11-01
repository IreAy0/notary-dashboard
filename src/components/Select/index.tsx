/* eslint-disable @typescript-eslint/no-shadow */
import React, { Fragment } from 'react';
import classnames from 'classnames';
import { Listbox, Transition } from '@headlessui/react';
import styles from './select.module.scss';

export interface SelectProps {
  label?: string;
  placeholder?: string;
  handleChange(option: { name: string; id: any }): void;
  options:{
    name: string | any;
    id?: string | any;
  }[];
  selected?: { name: string } | any;
  disabled?: boolean;
}

const Select = ({ options, label, disabled = false, selected, handleChange, placeholder, ...props }: SelectProps) => (
  
  <div className={classnames(styles.select__wrapper)} {...props}>
    
    {label && <span className="label__title">{label} </span>}
    <Listbox disabled={disabled} value={selected} onChange={handleChange}>
      <div>
        <Listbox.Button className={classnames(styles.select__btn, disabled ? styles.select__disabled : '')}>
          <div style={{textTransform: 'capitalize'}}>
            {/* <span>{selected?.name }</span> */}
            <span>{options.find(option => option.id === selected?.id)?.name || placeholder } </span>
           
          </div>
          <span className={styles.select__icon}>
            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m.793 5.207 1.414-1.414L8 9.586l5.793-5.793 1.414 1.414L8 12.414.793 5.207Z"
                fill="#363740"
              />
            </svg>
          </span>
        </Listbox.Button>
        <Transition as={Fragment}>
          <Listbox.Options className={styles.select__dropdown}>
            {options.length ? (
              options?.map((option, optionIdx) => (
                <Listbox.Option
                  // eslint-disable-next-line react/no-array-index-key
                  key={optionIdx}
                  className={({ selected }) => `${selected ? classnames(styles.select__item, styles.active) : styles.select__item}`}
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>{option?.name }</span>
                      {selected ? (
                        <span>
                          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.59 16.58 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42Z" fill="#363740" />
                          </svg>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))
            ) : (
              <span className={styles.select__item}>No options available</span>
            )}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  </div>
);

Select.defaultProps = {
  placeholder: 'Select',
  label: '',
  disabled: false,
  selected: null
};

export default Select;
