import React, { useRef, useState } from 'react';
import {  useHistory, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doSignOut } from 're-ducks/auth';
import {Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  Popover,
  Typography} from '@mui/material';

import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import classnames from 'classnames';
import { ReactComponent as Logout } from '../../../../assets/icons/logout.svg';
import { ReactComponent as Tick } from '../../../../assets/icons/tick-badge.svg';
import { ReactComponent as AlertErrorIcon } from '../../../../assets/icons/alertErrorIcon.svg';
import { ReactComponent as Setting } from '../../../../assets/icons/navSettings.svg';
import Avatar from '../../../../components/Avatar/index';
import menuStyles from '../../../../components/MenuDialog/menu.module.scss';


const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);


function HeaderUserbox({userProfile}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignout = () => {
    dispatch(doSignOut(() => history.push('../../auth/sign-in'), /* isWithRequest */ true));
  };
  const verifiedUser = userProfile?.national_verification === true ? 'VERIFIED' : 'UNVERIFIED';

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
      <Avatar withInidicator name={`${userProfile?.first_name} ${userProfile?.last_name}`} />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{`${userProfile?.first_name} ${userProfile?.last_name}`}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {userProfile.role}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
        <Avatar withInidicator name={`${userProfile?.first_name} ${userProfile?.last_name}`} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{`${userProfile?.first_name} ${userProfile?.last_name}`}</UserBoxLabel>
            <UserBoxDescription variant="body2">
            {userProfile.role}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List className={classnames(menuStyles.menu__dropdown, menuStyles.large)} sx={{ p: 1 }} component="nav" >
          <ListItem >
          <div className={menuStyles.header}>
                    <div className="flex flex__spaced flex__item-center">
                      <div>
                        <strong className="text--capitalize">Notary</strong>&nbsp;
                        <small className={`text--${userProfile?.national_verification === true ? 'green' : 'red'}`}>
                          { verifiedUser}
                        </small>
                      </div>
                      <span className="flex flex__item-center">{userProfile?.national_verification === true ? <Tick /> : <AlertErrorIcon />}</span>
                    </div>
                    <div className={menuStyles.label__max}>
                      <span className={menuStyles.label}>
                        Personal: <br />
                      </span>
                      <strong className="text--capitalize">
                        {userProfile.first_name} {userProfile.last_name}
                      </strong>
                      <br />
                      <span title={userProfile.email}>{userProfile.email}</span>
                    </div>
                  </div>
          </ListItem>
          
          <ListItem
            to="/settings/Personal_Info"
            component={NavLink}
            className={menuStyles.item}
          >
             <div className="icon__wrap">
                            <Setting />
                          </div>
                          Settings
          </ListItem>
          <ListItem
            button
            onClick={handleSignout}
            className={menuStyles.item}
          >
          
                          <div className="icon__wrap">
                            <Logout />
                          </div>
                          Sign Out
                     
          </ListItem>
        </List>
        
      </Popover>
    </>
  );
}

export default HeaderUserbox;
