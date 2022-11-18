/* eslint-disable react/require-default-props */
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Box, alpha, lighten, useTheme } from '@mui/material';
import { useIdleTimer } from 'react-idle-timer'

import { useDispatch, useSelector } from 'react-redux';
import useTypedSelector from 'hooks/useTypedSelector';
import PreLoader from 'components/Preloader';
import { fetchUserProfile } from 're-ducks/user';
import { doSignOut } from 're-ducks/auth';
import history from 'utils/history';
import toast from 'react-hot-toast';
import Header from './Header';
import Sidebar from './Sidebar';

interface SidebarLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = ({children}) => {

  const dispatch = useDispatch();

  const onIdle = () => {
    
    // dispatch log out when idle
    console.log('log outt');
    dispatch(doSignOut(() => history.push('../../auth/sign-in'), /* isWithRequest */ true));

  }

  
  const idleTimer = useIdleTimer({ 
    onIdle,
    timeout: 1000 * 60 * 3,
    promptTimeout: 0  
  })

  const theme = useTheme();
 
  const user = useSelector((state: any) => state?.auth?.signIn);
  const [userProfile, setUserProfile] = useState<any>({});
  // const userProfile = useTypedSelector((state: any) => state.user);
  
  
  useEffect(() => {
    dispatch(
      fetchUserProfile(
        {},
        (success) => {
          setUserProfile(success);
        },
        (error: any) => {
          toast.error(error.message);
        }
      )
    );
      
  }, [dispatch]);
  
  
  const [updatedUser, setUpdatedUser] = useState<any>({ ...user, ...userProfile });
  
  if(!userProfile?.id){
    return <PreLoader />
  }
    
  return (
    <>
    {/* {!userProfile?.id && } */}
      <Box
        sx={{
          flex: 1,
          height: '100%',

          '.MuiPageTitle-wrapper': {
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? `0 1px 0 ${alpha(
                  lighten(theme.colors.primary.main, 0.7),
                  0.15
                )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                  theme.colors.alpha.black[100],
                  0.1
                )}, 0px 5px 12px -4px ${alpha(
                  theme.colors.alpha.black[100],
                  0.05
                )}`
          }
        }}
      >
        <Header />
        <Sidebar />
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            px: '1.5rem',
            py: '2rem',
            pt: `${theme.header.height}`,
            [theme.breakpoints.up('lg')]: {
              ml: `${theme.sidebar.width}`
            }
          }}
        >
          <Box display="block">
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SidebarLayout;
