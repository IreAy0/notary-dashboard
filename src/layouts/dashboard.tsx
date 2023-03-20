import React, { ReactNode, FC, HTMLAttributes, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';
import Sidebar from 'components/SideBar';
import classNames from 'classnames';
import { useIdleTimer } from 'react-idle-timer'
import useTypedSelector from 'hooks/useTypedSelector';
import Header from 'components/Header';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import styles from './layouts.module.scss';



interface Props extends HTMLAttributes<Element> {
  children: ReactNode;
}
const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop: string) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9)
        }
      })
    }
  })
);

const mdTheme = createTheme();

const Layout: FC<Props> = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const history = useHistory();
  const sidebar = useTypedSelector((state) => state.sidebar);
  const user = useTypedSelector((state: any) => state?.user);
  const userProfile = useTypedSelector((state: any) => state.auth.signIn);
  const [updatedUser, setUpdatedUser] = useState<any>({ ...user, ...userProfile });

  useEffect(() => {
    setLoading(false);
  }, [user]);

  useEffect(() => {
    setUpdatedUser({ ...userProfile, ...user });
  }, [userProfile, user]);

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
 
 

  return (
    <main className={classNames(styles.main__layout, sidebar.minimizeSidebar && styles.small)}>
      <Sidebar />
      <section className={styles.main__page}>
        <Header />
        <div className={styles.main__content}>{children}</div>
      </section>
    </main>
  );
};

export default Layout;

