import React from 'react';
import classnames from 'classnames';
import { TabOption } from 'types/tabs.interface';
import history from 'utils/history';
import styles from './tabs.module.scss';

export interface TabsProps {
  setActive(option: { label: string }): void;
  tabs: TabOption[];
  active: any;
  type?: string;
  size?: 'sm' | 'md' | any;
}

const Tabs = ({ tabs, active, setActive, type, size }: TabsProps) => {
  
  const activeClass = (tab: { label: string; title?: string }) =>
    (active) === (tab.label || tab.title) && styles.active;


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
            
              disabled={tab.disabled ?? false}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setActive(tab);
                // window.location.href = `/settings/${tab?.label.replaceAll(" ", "_")}`
                // history.location.pathname = `/settings/${tab?.label.replaceAll(" ", "_")}`
                history.push({
                  pathname: `/settings/${tab?.label.replaceAll(" ", "_")}`
                  // search:  `tab=${tab?.label.replaceAll(" ", "_")}`
                })
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

Tabs.defaultProps = {
  type: 'horizontal',
  size: 'md'
};

export default Tabs;
