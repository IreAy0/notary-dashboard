import React from 'react';
import classnames from 'classnames';
import { TabOption } from 'types/tabs.interface';
import { FormControlLabel, Radio } from '@mui/material';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import styles from './tabs.module.scss';

export interface SealTabsProps {
  setActive(option: { label: string, icon?: React.ReactNode  }): void;
  tabs: TabOption[];
  active: { label: string; title?: string };
  type?: string;
  size?: 'sm' | 'md' | any;
}

const  SealTabs = ({ tabs, active, setActive, type, size }:  SealTabsProps) => {
  const activeClass = (tab: { label: string; title?: string }) =>
    (active.label || active.title) === (tab.label || tab.title) && styles.active;
  const [selectedValue, setSelectedValue] = React.useState('a');

  return (
    <>
      <ul className={classnames(styles.tabs,styles.seal, styles[size], styles[`${type}`])}>
        {tabs.map((tab, index) => (
          <li
            key={tab.label}
            className={classnames(styles.tabs__item, styles[size], tab.disabled ? styles['tabs__item-disabled'] : '')}
          >
             
            {/* <span className={styles.tabs__id}>{index + 1}</span> */}
            
            <div>
            <Radio
  checked={active.label === tab.label}
  // onChange={handleChange}
  onChange={(e) => {
    e.preventDefault();
    setActive(tab);
  }}
  value={tab.label}
  name="radio-buttons"
  inputProps={{ 'aria-label': tab.label }}
/>
            </div>

            <input
              id={tab.label}
              disabled={tab.disabled ?? false}
              type="radio"
              onClick={(e) => {
                e.preventDefault();
                setActive(tab);
              }}
            />
            <label className={classnames(styles.tabs__label, activeClass(tab)) } htmlFor={tab.label}>
            {tab.icon && <div className={classnames(styles.tabs__icon, styles.tabs__icon_seal) }>{tab.icon}</div>}
              {tab.label}
            </label>
           
          </li>
        ))}
      </ul>
    </>
  );
};

SealTabs.defaultProps = {
  type: 'horizontal',
  size: 'md'
};

export default  SealTabs;
