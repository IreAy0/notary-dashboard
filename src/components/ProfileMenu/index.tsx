import React, { ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import styles from './menu.module.scss';

interface Props {
  children: ReactNode;
}

const ProfileMenu = ({ children }: Props) => (
  <div className="w-56 text-right fixed top-16">
    <Menu as="div" className={styles.menu}>
      {children}
    </Menu>
  </div>
);

export default ProfileMenu;
