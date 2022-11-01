import React, { HTMLAttributes } from 'react';
import styles from './SidebarLink.module.scss';

export interface ISidebarLinkProps extends HTMLAttributes<HTMLDivElement> {
  // link: FC;
  title: string;
  isActive?: boolean | undefined;
}

export const SidebarLink = ({ title, isActive }: ISidebarLinkProps) => (
  <div className={`${styles.homePage} ${isActive ? styles.activeLink : ''}`}>
    <p>{title}</p>
  </div>
);

SidebarLink.defaultProps = {
  isActive: false
};
