/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { doSignOut } from 're-ducks/auth';
import { Menu } from '@headlessui/react';
import { isAuthenticated } from 'utils';
import { DateRangePicker } from 'react-date-range';
import moment from 'moment';
import { userRequestOverview } from 're-ducks/user';
import SelectBtnStyles from 'components/CustomSelect/customSelect.module.scss';
import useTypedSelector from 'hooks/useTypedSelector';
import Button from 'components/Button';
import { ReactComponent as WhiteTick } from 'assets/icons/white-tick.svg';
import styles from './Header.module.scss';
import Notifications from './Notifications/Notifications';
import MenuDialog from '../MenuDialog';
import menuStyles from '../MenuDialog/menu.module.scss';
import Avatar from '../Avatar';
import { ReactComponent as Logo } from '../../assets/icons/tonote-logo-blue.svg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';
// import { ReactComponent as HideMenuIcon } from '../../assets/icons/hideMenuIcon.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick-badge.svg';
import { ReactComponent as AlertErrorIcon } from '../../assets/icons/alertErrorIcon.svg';
import { ReactComponent as Setting } from '../../assets/icons/navSettings.svg';
import { ReactComponent as Caret } from '../../assets/icons/caret.svg';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRange, setShowRange] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: any) => state?.auth?.signIn);
  const userProfile = useTypedSelector((state: any) => state.user);

  const [updatedUser, setUpdatedUser] = useState<any>({ ...user, ...userProfile });
  const { id } = useParams<{ id?: string }>();
  const onSignInPage = history.location.pathname.includes('sign-in');

  useEffect(() => {
    setUpdatedUser({ ...user, ...userProfile });
  }, [userProfile, user]);

  const handleSignout = () => {
    dispatch(doSignOut(() => history.push('../../auth/sign-in'), /* isWithRequest */ true));
  };




  const handleDate = (value: any) => {
    setSelectedDate(value.selection || value.range1);
  };
  
  useEffect(() => {
    dispatch(
      userRequestOverview(
        {},
        () => {},
        () => {}
      )
    );
  }, [dispatch])

  const selectDate = () => {
    dispatch(
      userRequestOverview(
        {
          from_date: moment(selectedDate.startDate).format('YYYY-MM-DD'),
          to_date: moment(selectedDate.endDate).format('YYYY-MM-DD')
        },
        () => {},
        () => {}
      )
    );
  };
  const headerTitle = () => {
    switch (history.location.pathname) {
      case '/':
        return (
          <div>
            <>Hello, {updatedUser?.first_name} 👋🏽</>
            
            <p className={styles.header__welcome_caption}>Welcome Back</p>
          </div>
        );
      case '/locker':
        return 'Locker';
      case `/locker/${id}`:
        return 'My Locker';
      case '/requests':
        return 'Requests';
      case `/request/${id}`:
        return 'My Request';
      case '/settings':
        return 'Settings';
      case '/documents':
        return 'My Documents';
      default:
        return `Hello, ${updatedUser?.first_name ?? updatedUser?.name}!`;
    }
  };
  const formatNum = (num: any) => num.slice(3, 10);
  const headerFilter = () => {
    switch (history.location.pathname) {
      case '/':
        return (
          <div className={styles.header__group}>
            <button className={styles.header__btn} type="button" onClick={() => setShowRange(!showRange)}>
              <p>
                {selectedDate.startDate
                  ? `${formatNum(selectedDate.startDate.toString().split('-').join('/'))} - ${formatNum(
                    selectedDate.endDate.toString().split('-').join('/')
                  )}`
                  : 'Select'}
              </p>
            </button>
          </div>
        );
      case '/settings':
        return '';
      case '/locker':
        return '';
      case '/request':
        return '';
      case '/documents':
        return '';
      default:
        return '';
    }
  };

  const verifiedUser = updatedUser?.national_verification === true ? 'VERIFIED' : 'UNVERIFIED';
  const authLink = (
    <div>
      {onSignInPage ? (
        <Link className="link mr-1" to="/auth/sign-up">
          Sign Up
        </Link>
      ) : (
        <Link className="link mr-1" to="/auth/sign-in">
          Sign In
        </Link>
      )}
    </div>
  );


  return (
    <header className={styles.header}>
      {!isAuthenticated() ? (
        <>
          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          {authLink}
        </>
      ) : (
        <>
          <div className="pt-1">
          {/* <button type="button" onClick={() => toggleMenu(dispatch)} className={styles.sidebar__btn}>
        <HideMenuIcon />
      </button> */}
            <h2 className="text--capitalize">{headerTitle()}</h2>
          </div>
          <div className="flex">
            <MenuDialog>
              <div>{headerFilter()}</div>
              {/* {showRange && (
                <div style={{ transform: 'scale(0.88)', position: 'absolute' }}>
                  <DateRangePicker rangeColors={['#003bb3']} ranges={[selectedDate]} onChange={handleDate} />
                  <Button theme="primary" className={SelectBtnStyles['custom__dropdown-btn']} onClick={selectDate}>
                    <WhiteTick />
                  </Button>
                </div>
              )} */}
            </MenuDialog>
            <div>
              <MenuDialog>
                <div>
                  <Menu.Button>
                    <div className={styles.header__group}>
                      <div className={styles.header__profile}>
                        <Avatar withInidicator name={`${updatedUser?.first_name} ${updatedUser?.last_name}`} />
                        <div className="flex flex__item-center mr-1">
                          <strong className=" mr-1 text--capitalize">C.F.O</strong>
                          <Caret />
                        </div>
                      </div>
                    </div>
                  </Menu.Button>
                </div>
                <Menu.Items className={classnames(menuStyles.menu__dropdown, menuStyles.large)}>
                  <div className={menuStyles.header}>
                    <div className="flex flex__spaced flex__item-center">
                      <div>
                        <strong className="text--capitalize">C.F.O</strong>&nbsp;
                        <small className={`text--${updatedUser?.national_verification === true ? 'green' : 'red'}`}>
                          {updatedUser?.national_verification === false ? 'FAILED' : verifiedUser}
                        </small>
                      </div>
                      <span className="flex flex__item-center">{updatedUser?.national_verification === true ? <Tick /> : <AlertErrorIcon />}</span>
                    </div>
                    <div className={menuStyles.label__max}>
                      <span className={menuStyles.label}>
                        Personal: <br />
                      </span>
                      <strong className="text--capitalize">
                        {updatedUser.first_name} {updatedUser.last_name}
                      </strong>
                      <br />
                      <span title={updatedUser.email}>{updatedUser.email}</span>
                    </div>
                  </div>
                  <div className="">
                    <Menu.Item as="div">
                      {() => (
                        <button type='button' onClick={() => setShowNotifications(true)} className={menuStyles.item}>
                          <div className="icon__wrap">
                            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M7.65 16a2.503 2.503 0 0 1-2.5-2.5.5.5 0 0 1 1 0c0 .827.674 1.5 1.5 1.5.827 0 1.5-.673 1.5-1.5a.5.5 0 0 1 1 0c0 1.379-1.122 2.5-2.5 2.5Z"
                                fill="#363740"
                              />
                              <path
                                d="M13.151 14h-11a1.168 1.168 0 0 1-.759-2.053.457.457 0 0 1 .054-.04 4.48 4.48 0 0 0 1.538-3.38v-1.86A4.672 4.672 0 0 1 7.651 2c.107 0 .222.002.329.02a.5.5 0 1 1-.164.986C7.762 2.997 7.704 3 7.65 3a3.671 3.671 0 0 0-3.667 3.667v1.86c0 1.61-.706 3.134-1.935 4.18-.01.008-.019.016-.03.023a.165.165 0 0 0-.035.103c0 .091.076.167.167.167h11c.09 0 .167-.076.167-.167a.16.16 0 0 0-.036-.103l-.029-.023a5.482 5.482 0 0 1-1.935-4.18V7.8a.5.5 0 0 1 1 0v.727c0 1.298.56 2.527 1.54 3.382a1.163 1.163 0 0 1 .46.925c0 .643-.524 1.166-1.167 1.166Z"
                                fill="#363740"
                              />
                              <circle cx="12.25" cy="3.25" r="3.25" fill="#D35B63" />
                              <path
                                d="M12.318 6.667a3.337 3.337 0 0 1-3.334-3.334A3.337 3.337 0 0 1 12.318 0a3.337 3.337 0 0 1 3.333 3.333 3.337 3.337 0 0 1-3.333 3.334Zm0-5.667a2.336 2.336 0 0 0-2.334 2.333 2.336 2.336 0 0 0 2.334 2.334 2.336 2.336 0 0 0 2.333-2.334A2.336 2.336 0 0 0 12.318 1Z"
                                fill="#D35B63"
                              />
                            </svg>
                          </div>
                          Notifications
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item as="div">
                      {() => (
                        <button type='button' onClick={() => history.push('settings')} className={menuStyles.item}>
                          <div className="icon__wrap">
                            <Setting />
                          </div>
                          Settings
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item as="div">
                      {() => (
                        <button type='button' onClick={handleSignout} className={menuStyles.item}>
                          <div className="icon__wrap">
                            <Logout />
                          </div>
                          Sign Out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </MenuDialog>
            </div>
          </div>
        </>
      )}
      {showNotifications && <Notifications isOpen={showNotifications} isClose={() => setShowNotifications(false)} />}
    </header>
  );
};

Header.defaultProps = {
  teamSignUp: false
};

export default Header;

