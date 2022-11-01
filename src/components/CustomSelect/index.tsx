import React, { FC, useState, useEffect, useRef, ReactNode } from 'react';
import useUpdateEffect from 'hooks/useUpdateEffect';
import classNames from 'classnames';
import styles from './customSelect.module.scss';

interface Props {
  children: ReactNode;
  tab: ReactNode | string;
  optionSelected: boolean;
  label?: string;
}

const CustomSelect: FC<Props> = ({ children, tab, optionSelected, label }: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const customDropdown = useRef<any>();
  const tabRef = useRef<any>();

  const dropdownHandler = (e: any) => {
    const outsideAreaWasClicked = !customDropdown.current?.contains(e.target);
    const dropdownTogglerWasClicked = tabRef.current?.contains(e.target);

    // If the dropdown toggler is clicked, negate the dropdown option's state
    if (dropdownTogglerWasClicked && customDropdown.current) {
      setShowDropdown((prevState) => !prevState);
    }

    // If anywhere outside the dropdown is clicked, close the dropdown's option
    if (outsideAreaWasClicked && customDropdown.current) setShowDropdown(false);
  };

  useUpdateEffect(() => {
    // If an option is selected, close the dropdown's option
    setShowDropdown(false);
  }, [optionSelected]);

  useEffect(() => {
    // Add the click event listener on component mount
    document?.body?.addEventListener('click', dropdownHandler);

    // Remove the click event listener when this component is destroyed
    return () => document.body.removeEventListener('click', dropdownHandler);
  }, []);

  return (
    <>
      {label && <span className="label__title">{label}</span>}
      <div ref={customDropdown}>
        <div className={styles.custom__dropdown}>
          <div className="cursor-pointer" ref={tabRef}>
            {tab}
          </div>
          <div className={classNames(styles['custom__dropdown-option'], showDropdown ? styles.active : '')}>{children}</div>
        </div>
      </div>
    </>
  );
};

export const DefaultTab = ({ label }: { label: ReactNode | string }) => (
  <div className={styles.select__btn}>
    <div>
      <span>{label}</span>
    </div>
    <span>
      <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="m.793 5.207 1.414-1.414L8 9.586l5.793-5.793 1.414 1.414L8 12.414.793 5.207Z"
          fill="#363740"
        />
      </svg>
    </span>
  </div>
);

CustomSelect.defaultProps = {
  label: ''
};

export default CustomSelect;
