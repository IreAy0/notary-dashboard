import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleMenu } from 're-ducks/sidebar';
import useTypedSelector from 'hooks/useTypedSelector';
import { RootState } from 're-ducks/rootReducer';
import classNames from 'classnames';
import styles from './SideBar.module.scss';

import { ReactComponent as HideMenuIcon } from '../../assets/icons/hideMenuIcon.svg';
import { ReactComponent as HomeIcon } from '../../assets/icons/homeIcon.svg';
import { ReactComponent as MYDocsIcon } from '../../assets/icons/myDocsIcon.svg';
import { ReactComponent as MYRequestIcon } from '../../assets/icons/requestIcon.svg';
import { ReactComponent as SettingsIcon } from '../../assets/icons/settingsIcon.svg';
import { ReactComponent as Logo } from '../../assets/icons/sidebarLogo.svg';

const SideBar = () => {
  const dispatch = useDispatch();
  const sidebar = useTypedSelector((state: RootState) => state.sidebar);

  return (
  <div className={classNames(styles.sideBar__wrapper, sidebar.minimizeSidebar && styles.small)}>
    <div className={styles.sidebar__header}>
      <Link className={classNames('flex', styles.logo)} to="/">
        <Logo />
      </Link>
      <button type="button" onClick={() => toggleMenu(dispatch)} className={styles.sidebar__btn}>
        <HideMenuIcon />
      </button>
    </div>

    <div className={styles.menu}>
      <ul className={styles.menu__list}>
        <li className={styles.menu__item}>
          <NavLink exact activeClassName={styles.active} className={styles.menu__link} to="/">
            <button type="button" className={styles.menu__icon}>
              <HomeIcon />
            </button>
            <span className={styles.menu__label}>Dashboard</span>
          </NavLink>
        </li>
        <li className={styles.menu__item}>
          <NavLink activeClassName={styles.active} className={styles.menu__link} to="/locker">
            <button>
              <MYDocsIcon />
            </button>
            <span className={styles.menu__label}>Locker</span>
          </NavLink>
        </li>
        <li className={styles.menu__item}>
          <NavLink activeClassName={styles.active} className={styles.menu__link} to="/requests">
            <button>
              <MYRequestIcon />
            </button>
            <span className={styles.menu__label}>Requests</span>
          </NavLink>
        </li>
        <li className={styles.menu__item}>
          <NavLink activeClassName={styles.active} className={styles.menu__link} to="/settings/Personal_Info">
            <button>
              <SettingsIcon />
            </button>
            <span className={styles.menu__label}>Settings</span>
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
  )
};

export default SideBar;
