import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doSignOut } from 're-ducks/auth';
// import { Menu } from '@headlessui/react';
import { isAuthenticated } from 'utils';
import { getToken } from 'utils/getToken';
import socket from 'utils/socket'
import { getAllRequestAction, confirmRequest } from 're-ducks/request';
import { DateRangePicker } from 'react-date-range';
import moment from 'moment';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { editUserProfile, fetchUserProfile, userRequestOverview } from 're-ducks/user';
import SelectBtnStyles from 'components/CustomSelect/customSelect.module.scss';
import useTypedSelector from 'hooks/useTypedSelector';
import Button from 'components/Button';
import { ReactComponent as WhiteTick } from 'assets/icons/white-tick.svg';
import {Box,
  List,
  ListItem,
  alpha,
  Stack,
  lighten,
  Divider,
  IconButton,
  Tooltip,
  styled,
  useTheme,
  Typography} from '@mui/material';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import instance from 'services/axios';
import toast from 'react-hot-toast';
import HeaderUserbox from './Userbox';
import styles from '../../../components/Header/Header.module.scss';
import { SidebarContext } from '../../../contexts/SidebarContext';

// background-color: ${alpha(theme.header.background, 0.95)};
const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
       background: #fff;
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);


const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600]
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}));



const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: 16px;
                            content: "";
                            background: blue;
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

function Header() {
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

  const [checked, setChecked] = React.useState(true);

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // instance.post('/')
    dispatch(
      editUserProfile(
        {
          is_online: event.target.checked
        },
        () => {
          // setSubmitting(false);
          toast.success('Profile updated successfully.'
          )
          // toast.success('Profile updated successfully');
          // nextStep();
          dispatch(
            fetchUserProfile(
              {},
              () => {},
              () => {}
            )
          );
        },
        (error) => {
          // setSubmitting(false);
          toast.error('Error updating profile', {
            position: "top-right",
            style: {
              background: '#dc3545',
              color: '#fff',
              border: 'none',
              padding: '16px'

            }
          })
          toast.error(error);
        }
      )
    );
    setChecked(event.target.checked);
  };

  useEffect(() => {
    setUpdatedUser({ ...user, ...userProfile });
  }, [userProfile, user]);

  const handleSignout = () => {
    dispatch(doSignOut(() => history.push('../../auth/sign-in'), /* isWithRequest */ true));
  };

  const fetchRequest = useCallback(
    (status: string = '', nextPage: any = 1, itemsPerPage: any = 20) => {
      const params = {
        status: status === 'all' ? '' : status,
        page: nextPage === 0 ? 1 : nextPage,
        per_page: itemsPerPage
        // search: searchValue.toLowerCase()
      };
      // setLoading(true);
      // setDataPerPage(itemsPerPage);
      dispatch(
        getAllRequestAction(
          { params },
          () => {
            // setLoading(false);
          },
          (error) => {
            toast.error(error);
            // setLoading(false);
          }
        )
      );
    },
    [dispatch]
  );

  useEffect(() => {
    socket.auth = {
      username:`${userProfile.first_name}-${userProfile.last_name}`,
      token: getToken()
    };
    socket.connect();
    socket.on("connected", (data) => {
      // eslint-disable-next-line no-console
      console.log('socket connected')
    });
    socket.on("NOTARY_NEW_REQUEST", (data) => {
      const request = JSON.parse(data)
      if(request.id === userProfile.id){
        toast.success('You have a new request', {
          position: "top-right",
          duration: 10000
        })
        fetchRequest()
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


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
        return '' ;
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
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();

  

  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow:
          theme.palette.mode === 'dark'
            ? `0 1px 0 ${alpha(
              lighten(theme.colors.primary.main, 0.7),
              0.15
            )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
            : `0px 2px 8px -3px ${alpha(
              theme.colors.alpha.black[100],
              0.2
            )}, 0px 5px 22px -4px ${alpha(
              theme.colors.alpha.black[100],
              0.1
            )}`
      }}
    >
      <Box
          component="span"
          sx={{
           
            display: { lg: 'none', xs: 'inline-block' }
          }}
        >
          <Tooltip arrow title="Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? (
                <MenuTwoToneIcon fontSize="small" />
              ) : (
                <CloseTwoToneIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>


        
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
        spacing={2}
      >
       
        <ListWrapper
        sx={{
          display: {
            xs: 'none',
            md: 'block'
          }
        }}
      >
        <List disablePadding component={Box} display="flex">
          
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button  
          >
            <h2 className="text--capitalize">{headerTitle()}</h2>

          </ListItem>
        </List>
      </ListWrapper>
      </Stack>
      <Box display="flex" alignItems="center">
      <div>{headerFilter()}</div>
      {/* {showRange && (
                <div style={{ transform: 'scale(0.88)', position: 'absolute', top: '4rem', right: '1rem' }}>
                  <DateRangePicker rangeColors={['#003bb3']} ranges={[selectedDate]} onChange={handleDate} />
                  <Button theme="primary" className={SelectBtnStyles['custom__dropdown-btn']} onClick={selectDate}>
                    <WhiteTick />
                  </Button>
                </div>
      )} */}
        <FormGroup>
       
       <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Offline</Typography>
        <IOSSwitch sx={{ m: 1 }} checked={updatedUser?.is_online}
      onChange={handleChangeSwitch}
      inputProps={{ 'aria-label': 'controlled' }} />
        <Typography>Online</Typography>
      </Stack>
      
     
    </FormGroup>
        <HeaderUserbox userProfile={updatedUser}/>
        
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
