import React from 'react';
import classnames from 'classnames';
import { TabOption } from 'types/tabs.interface';
// import history from 'utils/history';
import styles from './tabs.module.scss';

export interface TabsProps {
  setActive(option: { label: string }): void;
  tabs: TabOption[];
  active: { label: string; title?: string };
  type?: string;
  size?: 'sm' | 'md' | any;
}

const InfoTabs = ({ tabs, active, setActive, type, size }: TabsProps) => {
  
  const activeClass = (tab: { label: string; title?: string }) =>
    (active.label || active.title) === (tab.label || tab.title) && styles.active;

  return (
    <>
      <ul className={classnames(styles.tabs, styles[size], styles[`${type}`])}>
        {tabs.map((tab, index) => (
          <li
            key={tab.label}
            className={classnames(styles.tabs__item, styles[size], activeClass(tab), tab.disabled ? styles['tabs__item-disabled'] : '')}
          >
            <span className={styles.tabs__id}>{index + 1}</span>
           
            <button
              style={{
                whiteSpace: 'nowrap'
              }}
              disabled={tab.disabled ?? false}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setActive(tab);
               
              }}
            >
              {tab.icon && <span className={styles.tabs__icon}>{tab.icon}</span>}
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

InfoTabs.defaultProps = {
  type: 'horizontal',
  size: 'md'
};

export default InfoTabs;
